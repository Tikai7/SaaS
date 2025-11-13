import { containerStyles, PALETTE, textStyles } from "@/styles/style"

export default function Testimonials() {
    return (
        <section style={containerStyles.testimonialsSection}>
            <h1 style={textStyles.h1}>Ils sont content !</h1>
            <h3 style={textStyles.h3}>(Promis c'est de vrais avis)</h3>

            <div style={containerStyles.testimonialsContainer}>
                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>"Cette application m'a fait gagner un temps précieux dans la rédaction de mes lettres de motivation. Le résultat était impressionnant et très professionnel."</p>
                    <span style={textStyles.span}>- Alice M.</span>
                </div>
                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>"J'étais sceptique au début, mais après avoir essayé l'outil, j'ai été agréablement surpris par la qualité des lettres générées. Hautement recommandé !"</p>
                    <span style={textStyles.span}>- Julien D.</span>
                </div>

                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>"L'interface est conviviale et facile à utiliser. En quelques clics, j'ai pu obtenir une lettre de motivation adaptée à mon profil et au poste visé."</p>
                    <h3 style={{...textStyles.span, color : PALETTE.primary}}>(ok lui c'est un faux)</h3>
                    <span style={textStyles.span}>- Sophie L.</span>
                </div>
            </div>
        </section>
    );
}
