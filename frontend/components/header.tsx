'use client'

import { containerStyles, linkStyles, PALETTE, textStyles, TOAST_TIME} from "@/styles/style";
import { useState } from "react";

export default function Header() {
    const [toastMessage, setToastMessage] = useState('')
    const [isToastVisible, setIsToastVisible] = useState(false)

    function handleDefault(page : string){
        let message = "Pas encore codé chef 🙈"
        if (page === "Acceuil")
            message = "T'es déjà là connard"
        else if (page === "Logo")
            message = "C'est juste un logo frero"

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
                <a onClick={()=>handleDefault("Logo")} style={{...textStyles.name, color:PALETTE.black}}>Letter<span style={textStyles.name}>In</span></a>
            </div>
            <nav style={containerStyles.navContainer}>
                <a href="#" onClick={()=>handleDefault("Acceuil")} style={linkStyles.navLink}>Accueil</a>
                <a href="#" onClick={()=>handleDefault("About")} style={linkStyles.navLink}>À propos</a>
                <a href="#" onClick={()=>handleDefault("Contact")} style={linkStyles.navLink}>Contact</a>
                <a href="#" onClick={()=>handleDefault("Connexion")} style={linkStyles.navLink}>Connexion</a>
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