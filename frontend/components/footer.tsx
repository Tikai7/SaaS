export default function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', marginTop: '2rem' }}>
            <p>&copy; {new Date().getFullYear()} MonSite. Tous droits réservés.</p>
        </footer>
    );
}
