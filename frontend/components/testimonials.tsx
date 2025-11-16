import { containerStyles, PALETTE, textStyles } from "@/styles/style"

export default function Testimonials() {
    return (
        <section style={containerStyles.testimonialsSection}>
            <h1 style={textStyles.h1}>Ils sont content ! </h1>
            <h3 style={textStyles.h3}>(Promis c'est de vrais avis)</h3>

            <div style={containerStyles.testimonialsContainer}>
                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>“Franchement pour un logiciel gratuit, c'est vraiment stylé, j'ai pu spam 30-40 candidatures en quelques heures 😂, pas mal gg“</p>
                    <span style={textStyles.span}>- Lyes K.</span>
                </div>
                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>“J'étais sceptique au début, mais après avoir essayé l'outil, j'ai été surpris par la qualité des lettres générées. Hautement recommandé !“</p>
                    <span style={textStyles.span}>- Walid G.</span>
                </div>

                <div style={containerStyles.testimonialCard}>
                    <p style={textStyles.p}>“Je pense honnêtement que c'est le meilleur outil au MONDE, le dev est UN GÉNIE, on en voit 1x par millénaire“</p>
                    <h3 style={{...textStyles.span, color : PALETTE.primary}}>(ok lui c'est un faux)</h3>
                    <span style={textStyles.span}>- Krimo H.</span>
                </div>
            </div>
        </section>
    );
}



