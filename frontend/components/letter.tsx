import { useState } from 'react';
import { GenerateCoverLetter } from '@/server/brige';
import { containerStyles, PALETTE, textStyles, buttonStyles, MAX_JOB, TOAST_TIME} from "@/styles/style";
import { MdAdd, MdDelete, MdWork, MdDescription, MdExpandMore, MdExpandLess, MdContentCopy} from 'react-icons/md';
import UserContext from "@/components/info"

export default function Letter() {

    const [generatedCoverLetter, setGeneratedCoverLetter] = useState([] as string[]);
    // CORRECTION 1: Initialisation de jobDescription avec au moins un élément
    const [jobDescription, setJobDescription] = useState<string[]>(['']);
    const [resume, setResume] = useState('');
    const [coverLetterExample, setCoverLetterExample] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    // CORRECTION 2: numberOfJobs synchronisé avec la longueur de jobDescription
    const [numberOfJobs, setNumberOfJobs] = useState(1);
    const [isModalXPOpen, setIsModalXPOpen] = useState(false);
    const [isModalLetterOpen, setIsModalLetterOpen] = useState(false);
    const [openLetters, setOpenLetters] = useState([] as boolean[])
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    async function Generate() {
        setIsLoading(true); 
        setGeneratedCoverLetter([]); 
        setOpenLetters([]); 

        try {
            const generationPromises = jobDescription.map(description => {
                return GenerateCoverLetter(
                    {
                        job_description: description,
                        resume: resume,
                        cover_letter_example: coverLetterExample
                    }
                );
            });

            const apiResponses = await Promise.all(generationPromises);
            const coverLetters = apiResponses.map(response => {
                console.log('API Response:', response);
                return formatGeneratedText(response["content"]);
            })
            setGeneratedCoverLetter(coverLetters);
            const initialOpenState = coverLetters.map((_, index) => index === 0);
            setOpenLetters(initialOpenState);
        }
        catch (error) {
            console.error('Error during API call:', error);
            setGeneratedCoverLetter(['An error occurred during generation. Please try again.']);
        }
        setIsLoading(false); 
    }
        
    function handleAddJob() {
        if (jobDescription.length < MAX_JOB) { 
            setJobDescription(oldDescriptions => [...oldDescriptions, '']); 
            setNumberOfJobs(old => old + 1); 
        }
    }
    
    function handleRemoveJob(indexToDelete: number) {
        if (jobDescription.length > 1) {
            setJobDescription(oldDescriptions => oldDescriptions.filter((_, index) => index !== indexToDelete));
            setNumberOfJobs(old => old - 1); 
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
        setIsModalLetterOpen(old => !old);
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

    function formatGeneratedText(generatedTextJson : string) : string {
        const jsonMatch = generatedTextJson.match(/\[JSON_START\]\s*(\{[\s\S]*?\})\s*\[JSON_END\]/);

        if (jsonMatch && jsonMatch[1]) { 
            try {
                const jsonString = jsonMatch[1];
                const parsedJson = JSON.parse(jsonString);
                let formattedLetter = '';
                
                // Ajouter la salutation au début, avant le sujet et les coordonnées pour un format plus "lettre"
                if (parsedJson.salutation) {
                    formattedLetter += `${parsedJson.salutation}\n\n`;
                }
                if (parsedJson.subject) {
                    formattedLetter += `Objet : ${parsedJson.subject}\n\n`;
                }
                if (parsedJson.header) {
                    formattedLetter += `${parsedJson.header.user_contact}\n\n${parsedJson.header.company_contact}\n\n`;
                }
                if (parsedJson.introduction) {
                    formattedLetter += `${parsedJson.introduction}\n\n`;
                }
                if (parsedJson.body) {
                    formattedLetter += `${parsedJson.body}\n\n`;
                }

                // Gestion des sections "bodyN" si elles existent (logique originale conservée)
                for (const key in parsedJson) {
                    if (key.startsWith('body') && key !== 'body' && parsedJson[key]) {
                        formattedLetter += `${parsedJson[key]}\n\n`;
                    }
                }

                if (parsedJson.conclusion) {
                    formattedLetter += `${parsedJson.conclusion}\n\n`;
                }
                if (parsedJson.closing_formula) {
                    formattedLetter += `${parsedJson.closing_formula}\n`;
                }
                if (parsedJson.signature) {
                    formattedLetter += `${parsedJson.signature}\n`;
                }
                // Nettoyage : remplacer les [object Object] et les espaces superflus
                formattedLetter = formattedLetter.replace(/\[object Object\]/g, '').trim();

                return formattedLetter.trim();
                
            } catch (e) {
                console.error('Erreur lors du parsing du JSON:', e);
                return generatedTextJson;
            }
        }
        return generatedTextJson;
    }

    
    return (
        <section style={containerStyles.letterSectionContainer}>
            <h1 style={textStyles.h1}>
                Générez en
                <span style={{...textStyles.h1, color : PALETTE.white}}> un clic</span><br/> vos lettres de motivation !
            </h1>
            <p style={textStyles.p}>Completez vos expériences, et ajoutez un exemple de lettre pour avoir <br/> la meilleure génération possible :)</p>

            <div style={containerStyles.buttonContainer}>
                <button onClick={handleCompleteXP} style={buttonStyles.secondary}>
                    <MdWork size={20} style={{ marginRight: 8 }} />
                    Compléter vos expériences
                </button>
                <button onClick={handleCompleteLetter} style={buttonStyles.secondary}>
                    <MdDescription size={20} style={{ marginRight: 8 }} />
                    Ajouter un exemple de lettre
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
                isModalLetterOpen && 
                <UserContext  
                    handleComplete={handleCompleteLetter} 
                    handleSave={handleLetterSave} 
                    isExperiences={false} 
                    completeText={coverLetterExample} 
                    setCompleteText={setCoverLetterExample} 
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
                                    color: PALETTE.primary, 
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
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: PALETTE.primary, padding: 0 }}
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
                        backgroundColor: PALETTE.primary, 
                        color: PALETTE.white,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        zIndex: 1000,
                        opacity: isToastVisible ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        margin: 0
                    }}
                >
                    {toastMessage}
                </div>
            )}
            <button style={buttonStyles.generateButton} onClick={Generate} disabled={isLoading}>
                {isLoading ? 'Génération en cours...' : 'Générer'}
            </button>
        </section>
        
    );
}