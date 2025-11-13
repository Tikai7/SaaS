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
        cover_letter_example?: string
    }
){
    try {
        console.log("[INFO] Generating cover letter...")
        const response = await axios.post('http://127.0.0.1:8000/groq', data);
        return response.data;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}
