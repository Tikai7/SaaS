import requests
from urllib.parse import urlparse
from typing import Tuple
from bs4 import BeautifulSoup 
import re 

class Config:
    CURRENT_MODEL_INDEX = 0
    TOO_MANY_REQUESTS = 429
    AVAILABLE_MODELS = [
        "llama-3.1-8b-instant",                       
        "meta-llama/llama-4-scout-17b-16e-instruct",  
        "llama-3.3-70b-versatile",
        "openai/gpt-oss-20b",
        "openai/gpt-oss-120b"         
    ]
    PRE_PROMPT = """
        Tu es un assistant IA spécialisé dans la rédaction de lettres de motivation ultra-personnalisées et convaincantes, avec un style humain et direct.
        L'utilisateur te fournira : 
        - son CV complet 
        - toutes ses expériences professionnelles et projets 
        - un exemple de lettre de motivation s'il en a une 
        - l'offre d'emploi ou le poste visé.

        Ta tâche est de créer une lettre de motivation qui : 
        1. Met en valeur uniquement les expériences et compétences pertinentes pour le poste (tu peux te concentrer sur une ou deux si c'est ce qui rend la lettre la plus forte).
        2. S'appuie sur le style de l'exemple fourni si disponible, mais garde un ton naturel et humain.
        3. Évite les mots creux, formules pompeuses ou clichés du type "salutations distinguées", "motivation sans faille", etc.
        4. Est structurée de manière claire et professionnelle.
        5. Vérifie l'orthographe et la grammaire.
        6. Langue : si l'offre d'emploi est en anglais, rédige la lettre en anglais ; sinon, en français.

        Lorsque tu rédiges la lettre, sélectionne **intelligemment** les expériences à mettre en avant pour qu'elles correspondent parfaitement à l'offre, même si cela signifie ignorer certaines expériences moins pertinentes.
        Ne mentionne jamais que tu es une IA dans la lettre.
        Le résultat doit paraître écrit par un humain, crédible et engageant.

        **INSTRUCTION CRUCIALE DE FORMATAGE :**
        **1. Le seul résultat que tu dois fournir est le JSON strict.**
        **2. N'ajoute aucun commentaire, explication, ou texte avant ou après le JSON.**
        **3. Encadre le JSON final avec les balises [JSON_START] et [JSON_END] pour en faciliter l'isolation programmatique.**

        Le format final **DOIT** être un JSON strict décomposé par sections :

        [JSON_START]
        {
            "subject": "<Objet de la lettre de motivation, clair et concis>",
            "header": {
                "user_contact": "<Coordonnées de l'utilisateur : Nom, Adresse, Téléphone, Email>",
                "company_contact": "<Coordonnées de l'entreprise : Nom de l'entreprise, Adresse>"
            },
            "salutation": "<Formule d'appel personnalisée, adressée à la personne responsable si connue>",
            "introduction": "<Présentation brève de l'utilisateur, du poste visé et comment il a découvert l'offre>",
            "body": "<Détail des compétences, expériences, réalisations pertinentes, et explication de la motivation réelle à rejoindre l'entreprise>",
            "conclusion": "<Résumé des points clés, réitération de l'intérêt et proposition d'un échange ou entretien>",
            "closing_formula": "<Formule de politesse simple, claire, naturelle (ex. : 'Cordialement,')>",
            "signature": "<Nom et Prénom de l'utilisateur>"
        }
        [JSON_END]
        """

class Functions:
    @staticmethod
    def get_normalized_content(job_description: str, resume: str, cover_letter_example: str = "") -> str:
        content = Config.PRE_PROMPT + f"""
        Voici l'offre d'emploi ou le poste visé :
        {job_description}
        Voici les expériences complètes de l'utilisateur :
        {resume}
        """
        if cover_letter_example:
            content += f"""
            Voici un exemple de lettre de motivation fourni par l'utilisateur :
            {cover_letter_example}
            """
        return content
    
    @staticmethod
    def scrap_if_needed(job_description : str):
        if Functions.is_url(job_description):
            print("[INFO] The job description is a URL, scrapping it...")
            return Functions.scrape_job_description(job_description)
        print("[INFO] The job description is already provided.")
        return job_description

    @staticmethod
    def is_url(url_string: str) -> bool:
        try:
            result = urlparse(url_string)
            return result.scheme in ['http', 'https'] and bool(result.netloc)
        except ValueError:
            return False
        
    @staticmethod
    def scrape_job_description(url: str) -> Tuple[str, bool]:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        }

        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            domain = urlparse(url).netloc.lower()
            text_content = ""

            if "welcometothejungle" in domain:
                title = soup.find("h1")
                company = soup.find("a", {"data-testid": "company-link"})
                desc = soup.find("div", {"data-testid": "job-description"})
                text_content = f"{title.get_text(strip=True) if title else ''}\n\n"
                text_content += f"Entreprise : {company.get_text(strip=True) if company else ''}\n\n"
                text_content += desc.get_text("\n", strip=True) if desc else soup.get_text("\n", strip=True)

            elif "linkedin" in domain:
                title = soup.find("h1")
                company = soup.find("a", class_="topcard__org-name-link")
                desc = soup.find("div", class_="show-more-less-html__markup")
                text_content = f"{title.get_text(strip=True) if title else ''}\n\n"
                text_content += f"Entreprise : {company.get_text(strip=True) if company else ''}\n\n"
                text_content += desc.get_text("\n", strip=True) if desc else soup.get_text("\n", strip=True)

            elif "hellowork" in domain or "regionsjob" in domain:
                title = soup.find("h1")
                company = soup.find("div", class_="companyName")
                desc = soup.find("div", class_="description")
                text_content = f"{title.get_text(strip=True) if title else ''}\n\n"
                text_content += f"Entreprise : {company.get_text(strip=True) if company else ''}\n\n"
                text_content += desc.get_text("\n", strip=True) if desc else soup.get_text("\n", strip=True)

            elif "indeed" in domain:
                title = soup.find("h1")
                company = soup.find("div", {"data-company-name": True})
                desc = soup.find("div", {"id": "jobDescriptionText"})
                text_content = f"{title.get_text(strip=True) if title else ''}\n\n"
                text_content += f"Entreprise : {company.get_text(strip=True) if company else ''}\n\n"
                text_content += desc.get_text("\n", strip=True) if desc else soup.get_text("\n", strip=True)

            else:
                title = soup.find("h1")
                paragraphs = soup.find_all(["p", "li"])
                joined = "\n".join(p.get_text(strip=True) for p in paragraphs)
                text_content = f"{title.get_text(strip=True) if title else ''}\n\n{joined}"

            # Nettoyage de texte
            text_content = "\n".join(line.strip() for line in text_content.splitlines() if line.strip())
            if len(text_content) < 200:
                print("[WARN] Description semble incomplète ou courte.")
            
            print(f"[INFO] Description :\n {text_content}")
            return text_content, True

        except requests.exceptions.RequestException as e:
            return f"[ERROR] Couldn't scrape {url}: {e}", False
