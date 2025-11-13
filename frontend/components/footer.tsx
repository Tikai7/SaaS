import { containerStyles } from "@/styles/style";

export default function Footer() {
    return (
        <footer style={containerStyles.footerContainer}>
            <p>&copy; {new Date().getFullYear()} MonSite. Tous droits réservés.</p>
        </footer>
    );
}
