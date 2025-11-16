import { containerStyles, textStyles } from "@/styles/style";

export default function Footer() {
    return (
        <footer style={containerStyles.footerContainer}>
            <p style={textStyles.pFooter}>&copy; {new Date().getFullYear()} LetterIn. Tous droits réservés.</p>
        </footer>
    );
}
