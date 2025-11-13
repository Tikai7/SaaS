import React, { useState, useEffect } from 'react';
import { modalStyles, buttonStyles, containerStyles, PALETTE, textStyles, transitionStyle } from '@/styles/style';


export default function UserContext(
    { handleComplete, handleSave, isExperiences, completeText, setCompleteText }: 
    {
        handleComplete: () => void, 
        handleSave: () => void,
        isExperiences: boolean,
        completeText: string,
        setCompleteText: React.Dispatch<React.SetStateAction<string>>
    }
) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50); 

        return () => clearTimeout(timer); 
    }, []);

    const overlayAnimation = {
        opacity: isVisible ? 1 : 0,
        ...transitionStyle,
    };
    
    const contentAnimation = {
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        opacity: isVisible ? 1 : 0,
        ...transitionStyle,
    };


    return (
        <div style={{ ...modalStyles.overlay, ...overlayAnimation }}>
            <div style={{ ...modalStyles.content, ...contentAnimation }}>
                {
                    isExperiences ?
                    <h2 style={textStyles.h2}>
                        Saisie de toutes vos expériences
                    </h2>          
                    :
                    <h2 style={textStyles.h2}>
                        Saisie d'un exemple de lettre
                    </h2>          
                }
                {
                    isExperiences ? 
                    <p>Veuillez entrer ici le texte complet de toutes vos expériences professionnelles (format CV, ou juste une liste détaillée).</p>
                    :
                    <p>Veuillez entrer ici un exemple de lettre de motivation que vous avez rédigée auparavant.</p>
                }
                <textarea
                    style={modalStyles.textArea}
                    placeholder={isExperiences ? "Saisissez ici toutes vos expériences..." : "Saisissez ici un exemple de lettre de motivation..."}
                    value={completeText}
                    onChange={(e) => setCompleteText(e.target.value)}
                />
                <div style={{...containerStyles.buttonContainer, justifyContent: 'flex-end', gap: '10px'}}>
                    <button 
                        onClick={handleSave} 
                        style={{...buttonStyles.secondary, backgroundColor: PALETTE.primary, color: PALETTE.white, border: 'none'}} 
                    >
                        Sauvegarder
                    </button>
                    <button 
                        onClick={handleComplete} 
                        style={{...buttonStyles.secondary, color: PALETTE.secondary, borderColor: PALETTE.secondary, marginLeft: '10px'}} 
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}