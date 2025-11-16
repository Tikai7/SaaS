import { useState } from 'react';
import { GenerateCoverLetter } from '@/server/brige';
import { containerStyles, PALETTE, textStyles, buttonStyles, MAX_JOB, TOAST_TIME} from "@/styles/style";
import { MdAdd, MdDelete, MdWork, MdDescription, MdExpandMore, MdExpandLess, MdContentCopy} from 'react-icons/md';
import UserContext from "@/components/info"

export default function Letter() {

    const [generatedCoverLetter, setGeneratedCoverLetter] = useState([] as string[]);
    const [stateCoverLetter, setStateCoverLetter] = useState([] as boolean[])
    const [jobDescription, setJobDescription] = useState<string[]>(['']);
    const [resume, setResume] = useState('');
    const [guidelines, setGuidelines] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [isModalXPOpen, setIsModalXPOpen] = useState(false);
    const [isModalGuidelinesOpen, setIsModalGuidelinesOpen] = useState(false);
    const [openLetters, setOpenLetters] = useState([] as boolean[])
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastColor, setToastColor] = useState(PALETTE.primary)

    function isContentful(str: string | string[]): boolean {
        if (typeof str === 'string') { 
            return str.trim().length > 0;
        } 
        else if (Array.isArray(str)) {
            return str.every(s => s && s.trim().length > 0);
        }
        return false;
    }

    async function Generate() {
        if (isContentful(jobDescription) && isContentful(resume)) {
            setIsLoading(true); 
            setGeneratedCoverLetter([]); 
            setOpenLetters([]); 

            try {
                const generationPromises = jobDescription.map(description => {
                    return GenerateCoverLetter(
                        {
                            job_description: description,
                            resume: resume,
                            guidelines: guidelines
                        }
                    );
                });

                const apiResponses = await Promise.all(generationPromises);
                const coverLetters = apiResponses.map(response => {
                    console.log('API Response:', response);
                    return formatGeneratedText(response["content"]);
                })
                const stateLetter = apiResponses.map(response => {
                    return response["used_model"] !== "None"
                })
                setGeneratedCoverLetter(coverLetters);
                setStateCoverLetter(stateLetter)
                const initialOpenState = coverLetters.map((_, index) => index === 0);
                setOpenLetters(initialOpenState);
            }
            catch (error) {
                console.error('Error during API call:', error);
                setGeneratedCoverLetter(['An error occurred during generation. Please try again.']);
                setStateCoverLetter([false])
            }
            setIsLoading(false); 
        }
        else{
            setToastColor(PALETTE.secondary)
            setToastMessage("Vous devez fournir une description et des expériences !");
            setIsToastVisible(true);
            setTimeout(() => {
                setIsToastVisible(false);
                setToastMessage('');
                setToastColor(PALETTE.primary)
            }, 2*TOAST_TIME); 
        }
    }

    function handleAddJob() {
        if (jobDescription.length < MAX_JOB) { 
            setJobDescription(oldDescriptions => [...oldDescriptions, '']); 
        }
    }
    
    function handleRemoveJob(indexToDelete: number) {
        if (jobDescription.length > 1) {
            setJobDescription(oldDescriptions => oldDescriptions.filter((_, index) => index !== indexToDelete));
        }
    }
    
    function handleJobDescriptionChange(index: number, value: string) {
        setJobDescription(oldDescriptions => {
            const newDescriptions = [...oldDescriptions];
            newDescriptions[index] = value;
            return newDescriptions;
        });
    }

    function handleCompleteXP() {
        setIsModalXPOpen(old => !old);
    }

    function handleCompleteLetter() {
        setIsModalGuidelinesOpen(old => !old);
    }

    function handleXPSave() {
        handleCompleteXP();   
    }
    
    function handleLetterSave() {
        handleCompleteLetter();
    }

    function toggleLetter(index: number) {
        setOpenLetters(prevOpenLetters => {
            const newOpenLetters = [...prevOpenLetters];
            newOpenLetters[index] = !newOpenLetters[index];
            return newOpenLetters;
        });
    }

    function copyToClipboard(text: string, index: number) {
        navigator.clipboard.writeText(text).then(() => {
            const message = `Lettre ${index + 1} copiée !`;
            setToastMessage(message);
            setIsToastVisible(true);
            setTimeout(() => {
                setIsToastVisible(false);
                setToastMessage('');
            }, TOAST_TIME); 
            
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            setToastMessage('Erreur lors de la copie.');
            setIsToastVisible(true);
            setTimeout(() => setIsToastVisible(false), TOAST_TIME); 
        });
    }

    function formatGeneratedText(generatedText: string) {
        let formattedLetter = generatedText;
        const match = generatedText.match(/\[DEBUT\]([\s\S]*?)\[FIN\]/);
        const match2 = generatedText.match(/\[START\]([\s\S]*?)\[END\]/);
        const match3 = generatedText.match(/\[DEBUT\]([\s\S]*?)\[END\]/);
        const match4 = generatedText.match(/\[START\]([\s\S]*?)\[FIN\]/);

        if (match && match[1]) {
            formattedLetter = match[1].trim();
        }
        else if (match2 && match2[1]) {
            formattedLetter = match2[1].trim();
        }
        else if (match3 && match3[1]) {
            formattedLetter = match3[1].trim();
        }
        else if (match4 && match4[1]) {
            formattedLetter = match4[1].trim();
        }

        return formattedLetter;
    }


    return (
        <section style={containerStyles.letterSectionContainer}>
            <h1 style={textStyles.h1}>
                Générez en
                <span style={{...textStyles.h1, color : PALETTE.white}}> un clic</span><br/> vos lettres de motivation !
            </h1>
            <p style={textStyles.p}>Completez vos expériences, et ajoutez des instructions pour avoir <br/> la meilleure génération possible 😊</p>

            <div style={containerStyles.buttonContainer}>
                <button onClick={handleCompleteXP} style={buttonStyles.secondary}>
                    <MdWork size={20} style={{ marginRight: 8 }} />
                    Compléter vos expériences
                </button>
                <button onClick={handleCompleteLetter} style={buttonStyles.secondary}>
                    <MdDescription size={20} style={{ marginRight: 8 }} />
                    Ajouter des instructions
                </button>
            </div>

            {   isModalXPOpen && 
                <UserContext  
                    handleComplete={handleCompleteXP} 
                    handleSave={handleXPSave} 
                    isExperiences={true} 
                    completeText={resume} 
                    setCompleteText={setResume} 
                />
            }
            {
                isModalGuidelinesOpen && 
                <UserContext 
                    handleComplete={handleCompleteLetter} 
                    handleSave={handleLetterSave} 
                    isExperiences={false} 
                    completeText={guidelines} 
                    setCompleteText={setGuidelines} 
                />
            }

            {jobDescription.map((description, index) => (
                <div style={containerStyles.jobDescriptionContainer} key={index}>
                    <textarea
                        style={containerStyles.textAreaContainer}
                        placeholder={
                            index === 0 
                                ? "Postez le lien ou la description du premier poste ici"
                                : `Description ou lien du ${index + 1}ème poste`
                        }
                        value={description}
                        onChange={(e) => handleJobDescriptionChange(index, e.target.value)}
                    />
                    
                    {index > 0 && (
                        <button style={buttonStyles.delButton} onClick={() => handleRemoveJob(index)}>
                            <MdDelete size={24} /> 
                        </button>
                    )}

                    {index === 0 && jobDescription.length < MAX_JOB && (
                        <button style={buttonStyles.addButton} onClick={handleAddJob}>
                            <MdAdd size={24} /> 
                        </button>
                    )}
                </div>
            ))}

            <div style={{display:"flex", marginTop:"3%"}}/>
            {
                generatedCoverLetter.map((content, index) => {
                    const isOpen = openLetters[index] || false;
                    
                    return (
                        <div 
                            style={{
                                ...containerStyles.generatedLetterContainer,
                                transition: 'all 0.4s ease-in-out',
                            }}
                            key={index}
                        >
                            <div 
                                style={{
                                    ...textStyles.h3, 
                                    textAlign: 'left', 
                                    color: stateCoverLetter[index]  ? PALETTE.primary : PALETTE.secondary,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: `1px solid ${isOpen ? PALETTE.primary : PALETTE.white}`,
                                    paddingBottom: isOpen ? '10px' : '0px',
                                    marginBottom: '0', 
                                }}
                            >
                                <div onClick={() => toggleLetter(index)} style={{ flexGrow: 1, cursor: 'pointer' }}>
                                    Lettre de motivation générée {jobDescription.length > 1 ? `pour le poste ${index + 1}` : ''}
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            copyToClipboard(content, index);
                                        }}
                                        style={{ background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer', 
                                            color: stateCoverLetter[index]  ? PALETTE.primary : PALETTE.secondary,
                                            padding: 0 
                                        }}
                                        title="Copier la lettre"
                                    >
                                        <MdContentCopy size={24} /> 
                                    </button>
                                    
                                    <div onClick={() => toggleLetter(index)} style={{ cursor: 'pointer' }}>
                                        {isOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                                    </div>
                                </div>
                            </div>
                            <div 
                                style={{
                                    maxHeight: isOpen ? '1000px' : '0', 
                                    overflow: 'hidden',
                                    transition: 'max-height 0.5s ease-in-out',
                                    paddingTop: isOpen ? '15px' : '0', 
                                }}
                            >
                                <textarea
                                    readOnly
                                    style={containerStyles.generatedLetterTextarea}
                                    value={content}
                                    rows={content.split('\n').length > 5 ? content.split('\n').length : 15} 
                                />
                            </div>
                        </div>
                    );
                })
            }

            {isToastVisible && (
                <div 
                    style={{
                        ...textStyles.p, 
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: toastColor,
                        color: PALETTE.white,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        zIndex: 1000,
                        opacity: isToastVisible ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        border : "2px solid",
                        margin: 0
                    }}
                >
                    {toastMessage}
                </div>
            )}
            <button style={buttonStyles.generateButton} onClick={Generate} disabled={isLoading}>
                {isLoading ? 'Génération en cours... ⌛' : 'Générer'}
            </button>
        </section>
        
    );
}