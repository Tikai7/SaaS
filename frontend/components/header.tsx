'use client'

import { containerStyles, linkStyles, PALETTE, textStyles, TOAST_TIME} from "@/styles/style";
import { useState } from "react";

export default function Header() {
    const [toastMessage, setToastMessage] = useState('')
    const [isToastVisible, setIsToastVisible] = useState(false)
    const [selected, setSelected] = useState('')

    function handleDefault(page : string){
        let message = "Pas encore codé chef 🙈"
        if (page === "Acceuil")
            message = "T'es déjà là connard"
        
        setSelected(page)
        setIsToastVisible(true)
        setToastMessage(message)
        setTimeout(() => {
            setIsToastVisible(false);
            setToastMessage('');
        }, TOAST_TIME); 
    }

    return (
        <header style={containerStyles.headerContainer}>
            <div>
                <a href="#" onClick={()=>handleDefault("Acceuil")} style={{...textStyles.name, color:PALETTE.black}}>Letter<span style={textStyles.name}>In</span></a>
            </div>
            <nav style={containerStyles.navContainer}>
                <a href="#" onClick={()=>handleDefault("Acceuil")} style={{...linkStyles.navLink, color : selected == "Acceuil" ? PALETTE.primary : PALETTE.black}}>Accueil</a>
                <a href="#info-section" style={linkStyles.navLink}>À propos</a>
                <a href="#info-section" style={linkStyles.navLink}>Contact</a>
                <a href="#" onClick={()=>handleDefault("Connexion")} style={{...linkStyles.navLink, color : selected == "Connexion" ? PALETTE.primary : PALETTE.black}}>Connexion</a>
            </nav>
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
                    border : "2px solid",
                    margin: 0
                }}
            >
                {toastMessage}
            </div>
        )}
        </header>
    );
}