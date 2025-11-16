import { containerStyles, textStyles, PALETTE } from "@/styles/style";

export default function Footer() {
    return (

        <footer id="info-section" style={containerStyles.footerContainer}>
            <div style={containerStyles.footerInfoContainer}>
                
                <div style={containerStyles.footerCard}>
                    <h3 style={textStyles.columnTitleStyle}>À propos de Letter<span style={{color : PALETTE.primary}}>In</span></h3>
                    <p style={textStyles.columnTextStyle}>
                        LetterIn est la plateforme qui vous aide à rédiger des pleins de lettres de motivations en un seul clic, de manière simple et rapide.
                    </p>
                </div>

                <div style={containerStyles.footerCard}>
                    <h3 style={textStyles.columnTitleStyle}>Contactez-nous</h3>
                    <p style={textStyles.columnTextStyle} >
                        E-mail : ailimis@outlook.fr
                    </p>
                    <p style={textStyles.columnTextStyle}>
                        Discord : tikai.#3804
                    </p>
                    <p style={textStyles.columnTextStyle}>
                        Adresse : Paris, France
                    </p>
                </div>

                <div style={containerStyles.footerCard}>
                    <h3 style={textStyles.columnTitleStyle}>Informations</h3>
                    <a href="#" style={textStyles.columnTextStyle}>Conditions d'utilisation</a><br/>
                    <a href="#" style={textStyles.columnTextStyle}>Politique de confidentialité</a><br/>
                    <a href="#" style={textStyles.columnTextStyle}>FAQ</a>
                </div>

            </div>

            <hr style={{ width: '80%', border: `1px solid ${PALETTE.lightGray}`, margin: '20px auto' }} />
            <p style={{...textStyles.pFooter, textAlign: 'center', width: '100%', paddingTop: '10px' }}>
                &copy; {new Date().getFullYear()} LetterIn. Tous droits réservés.
            </p>
        </footer>
    );
}