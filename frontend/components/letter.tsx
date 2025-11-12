import { useState } from 'react';
import { GenerateCoverLetter } from '@/server/brige';
import { containerStyles, PALETTE, textStyles, buttonStyles } from "@/styles/style";
import { MdAdd, MdDelete, MdWork, MdDescription } from 'react-icons/md';

export default function Letter() {

    const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resume, setResume] = useState('');
    const [coverLetterExample, setCoverLetterExample] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [numberOfJobs, setNumberOfJobs] = useState(1);

    async function Generate() {
        setIsLoading(true); 
        setGeneratedCoverLetter(''); 
        try {
            const response = await GenerateCoverLetter(
                {
                    job_description: jobDescription,
                    resume: resume,
                    cover_letter_example: coverLetterExample
                }
            );
            console.log('API Response:', response);
            setGeneratedCoverLetter(response["content"]);
        }
        catch (error) {
            console.error('Error during API call:', error);
            setGeneratedCoverLetter('An error occurred during generation. Please try again.');
        }
        setIsLoading(false); 
    }
    
        
    function handleAddJob() {
        if (numberOfJobs < 10) {
            setNumberOfJobs(old=> old + 1); 
        }
    }
    function handleRemoveJob() {
        setNumberOfJobs(old=> old - 1);
    }
    
    return (
        <section style={containerStyles.letterSectionContainer}>
            <h1 style={textStyles.h1}>
                Générez en
                <span style={{...textStyles.h1, color : PALETTE.white}}> un clic</span><br/> vos lettres de motivation !
            </h1>
            <p style={textStyles.p}>Completez vos expériences, et ajoutez un exemple de lettre pour avoir <br/> la meilleure génération possible :)</p>

            <div style={containerStyles.buttonContainer}>
                <button style={buttonStyles.secondary}>
                    <MdWork size={20} style={{ marginRight: 8 }} />
                    Compléter vos expériences
                </button>
                <button style={buttonStyles.secondary}>
                    <MdDescription size={20} style={{ marginRight: 8 }} />
                    Ajouter un exemple de lettre
                </button>
            </div>

            <div style={containerStyles.jobDescriptionContainer}>
                <textarea
                    style={containerStyles.textAreaContainer}
                    placeholder="Postez le lien ou la description du poste ici"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <button style={buttonStyles.addButton} onClick={handleAddJob}>
                    <MdAdd size={24} /> 
                </button>
            </div>

            {numberOfJobs > 1 && 
                new Array(numberOfJobs-1).fill(null).map((_, index) => (
                    <div style={containerStyles.jobDescriptionContainer} key={index}>
                        <textarea
                            style={containerStyles.textAreaContainer}
                            placeholder={`Description ou lien du ${index + 2}ème poste`}
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <button style={buttonStyles.delButton} onClick={handleRemoveJob}>
                            <MdDelete size={24} /> 
                        </button>
                    </div>
                ))
            }

            <button style={buttonStyles.generateButton} onClick={Generate} disabled={isLoading}>
                {isLoading ? 'Génération en cours...' : 'Générer'}
            </button>
        </section>
        
    );
}
