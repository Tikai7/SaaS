export const PALETTE = {
    primary: '#019875',
    secondary: '#B8293D',
    white: '#FFFFFF',
    black: '#000000',
    text: '#333333',
    lightGray: '#F4F4F4',
    gray: '#AAAAAA',
    border: '#EAEAEA'
};

export const linkStyles = {
    navLink: {
        textDecoration: 'none',
        color: PALETTE.black,
        fontSize: '16px',
        fontWeight: '500',
    },
    navConnexionLink: {
        textDecoration: 'none',
        color: PALETTE.primary,
        fontSize: '16px',
        fontWeight: '600',
    },
};

export const textStyles = {
    h1: {
        fontSize: '64px',
        fontWeight: 'bold',
        margin: '0 auto',
        maxWidth: '810px',
        textAlign: 'center' as const,
        color : PALETTE.black,
        lineHeight: 1.1,
    },
    p: {
        fontSize: '18px',
        textAlign: 'center' as const,
        marginTop: '1%',
        color : PALETTE.black
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
        backgroundColor: PALETTE.secondary,
        color: PALETTE.white,
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '15%',
        marginTop: '3%',
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
        borderBottom: `2px solid ${PALETTE.black}`,
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
    letterSectionContainer : {
        backgroundColor: PALETTE.primary,
        display : "flex",
        flexDirection: 'column' as const,
        alignItems : "center",
        justifyContent : "center",
        padding: '80px 40px',
    },
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
};
