export const MAX_JOB = 10
export const TOAST_TIME = 2000

export const PALETTE = {
    primary: '#019875',
    secondary: '#B8293D',
    terciary : "#002408",
    white: '#FFFFFF',
    black: '#000000',
    text: '#333333',
    lightGray: '#F4F4F4',
    gray: '#AAAAAA',
    border: '#EAEAEA'
};

export const transitionStyle = {
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
};

export const linkStyles = {
    navLink: {
        textDecoration: 'none',
        color: PALETTE.black,
        fontSize: '16px',
        fontWeight: 'bold',
    },
    navConnexionLink: {
        textDecoration: 'none',
        color: PALETTE.primary,
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '1.5',
    },
};

export const textStyles = {
    name : {
        fontSize: '28px',
        fontWeight: 'bold' as const,
        color : PALETTE.primary,
        marginBottom: '15px',
    },
    h1: {
        fontSize: '64px',
        fontWeight: 'bold',
        margin: '0 auto',
        maxWidth: '810px',
        textAlign: 'center' as const,
        color : PALETTE.black,
        lineHeight: 1.1,
    },
    h2: {
        fontSize: '28px',
        fontWeight: 'bold' as const,
        color : PALETTE.primary,
        marginBottom: '20px',
    },
    h3: {
        fontSize: '20px',
        fontWeight: 'bold' as const,
        color : PALETTE.primary,
        marginLeft: '10px',
    },
    p: {
        fontSize: '18px',
        textAlign: 'center' as const,
        marginTop: '1%',
        color : PALETTE.black
    },
    pFooter : {
        // borderTop: '1px solid #1a1a1a',
        // padding : "1%"
    },
    span: {
        fontSize: '16px',
        fontStyle: 'italic' as const,
        color : PALETTE.gray
    },
};


export const buttonStyles = {
    secondary: {
        flexDirection: 'row' as const,
        display: 'flex',
        backgroundColor: PALETTE.white,
        color: PALETTE.black,
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 24px',
        border: `2px solid ${PALETTE.black}`,
        borderRadius: '8px',
        cursor: 'pointer',
    },
    addButton: {
        backgroundColor: PALETTE.black,
        color: PALETTE.white,
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '0 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    delButton: {
        backgroundColor: PALETTE.white,
        color: PALETTE.secondary,
        border : `2px solid ${PALETTE.secondary}`,
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '0 20px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    generateButton: {
        backgroundColor: PALETTE.terciary,
        color: PALETTE.white,
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '15%',
        marginTop: '3%',
        // border : "2px solid " + PALETTE.black,
    },

};


export const modalStyles = {
    overlay: {
        display: 'flex',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    content: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    },
    textArea: {
        width: '100%',
        minHeight: '200px',
        padding: '10px',
        marginTop: '15px',
        marginBottom: '15px',
        border: `1px solid ${PALETTE.gray}`, 
        borderRadius: '5px',
        resize: 'none' as const,
    },
};

export const containerStyles = {
    main: {
        fontFamily: 'Inter, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: PALETTE.text,
        backgroundColor: PALETTE.white,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        // borderBottom: `2px solid ${PALETTE.black}`,
    },
    navContainer: {
        display: 'flex',
        gap: '30px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: '20px',
        marginTop: '5%',
        marginBottom: '3%',
    },
    letterSectionContainer: {
        backgroundColor: PALETTE.primary,
        display: "flex",
        flexDirection: 'column' as const,
        alignItems: "center",
        justifyContent: "center",
        padding: '80px 40px',
        position: 'relative' as const,
        overflow: 'hidden', 
        backgroundImage: `
            repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.05) 0px,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px,
                transparent 20px
            ),
            repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.05) 0px,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px,
                transparent 20px
            ),
            /* 2. Ajout d'un léger grain/point */
            radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 10px 10px', /* Taille du grain à la fin */
        backgroundRepeat: 'repeat',
        zIndex: 1, 
    },
    // letterSectionContainer : {
    //     backgroundColor: PALETTE.primary,
    //     display : "flex",
    //     flexDirection: 'column' as const,
    //     alignItems : "center",
    //     justifyContent : "center",
    //     padding: '80px 40px',
    // },
    jobDescriptionContainer: {
        marginTop: '1%',
        width: '100%',
        maxWidth: '700px',
        display: 'flex',
        gap: '10px',
    },
    textAreaContainer: {
        width: '100%',
        padding: '2%',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: PALETTE.white,
        border: `1px solid ${PALETTE.black}`,
        boxSizing: 'border-box' as const,
        resize: 'none' as const,
        maxHeight: '60px',
    },
    testimonialsSection: {
        backgroundColor: PALETTE.lightGray,
        padding: '40px 20px',
        textAlign: 'center' as const,
    },
    footerContainer : {
        backgroundColor: PALETTE.black,
        color: PALETTE.white,
        textAlign: 'center' as const,   
        padding: "5%",
    },
    testimonialsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
        marginTop: '30px',
        flexWrap: 'wrap' as const,
    },
    testimonialCard: {
        backgroundColor: PALETTE.white,
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        
    },
    generatedLetterContainer: {
        marginTop: '1%',
        padding: '20px',
        border: `2px solid ${PALETTE.black}`,
        borderRadius: '8px',
        backgroundColor: PALETTE.white,
        maxWidth: '800px',
        width: '100%',
    },
    generatedLetterTextarea: {
        width: '100%',
        padding: '1.5%',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        fontSize: '1rem',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap', // Important pour gérer les sauts de ligne
        resize: 'none' as const, // Important pour verrouiller la taille
        fontFamily: 'Inter, sans-serif', // Utilisez la même police que le reste de votre design
        backgroundColor: PALETTE.white,
        color: PALETTE.text,
    },
};
