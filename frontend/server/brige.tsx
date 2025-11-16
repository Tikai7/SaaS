import axios from 'axios';

export async function TestAPI() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/');
        return response.data;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
} 

export async function GenerateCoverLetter(
    data: { 
        job_description: string; 
        resume: string; 
        guidelines?: string
    }
){
    try {
        if (data["job_description"]) {
            console.log("[INFO] Generating cover letter...")
            const response = await axios.post('http://127.0.0.1:8000/groq', data);
            return response.data;
        }
        return {
            "content" : "Madame Monsieur\nJE SUIS UN ENORME FILS... c'est ça tu veux ? Non ?\nAlors fourni une description.\n(stp)"
        }
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}
