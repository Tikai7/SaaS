import { containerStyles, linkStyles } from "@/styles/style";

export default function Header() {
    return (
        <header style={containerStyles.headerContainer}>
            <div>
                {'<Nom du site>'} <span>{'(on en a pas encore)'}</span>
            </div>
            <nav style={containerStyles.navContainer}>
                <a href="#" style={linkStyles.navLink}>Accueil</a>
                <a href="#" style={linkStyles.navLink}>À propos</a>
                <a href="#" style={linkStyles.navLink}>Contact</a>
                <a href="#" style={linkStyles.navConnexionLink}>Connexion</a>
            </nav>
        </header>
    );
}