import requests
from urllib.parse import urlparse
from typing import Tuple
from bs4 import BeautifulSoup 

class Config:
    ORIGINS = [
        "http://localhost:3000",  
        "https://letterin.vercel.app/"
    ]
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
        Tu es un assistant IA expert en rédaction de lettres de motivation hautement personnalisées, professionnelles et orientées résultats.

        L'utilisateur te fournira :
        - Son CV complet (texte brut ou structuré)
        - Ses expériences professionnelles, projets et compétences
        - Ses propres instructions ou consignes spécifiques (optionnel)
        - L'offre d'emploi ou le poste ciblé

        TA MISSION :
        Rédiger une lettre de motivation parfaitement adaptée au poste, en respectant les exigences suivantes :

        1. Pertinence maximale :
        - Sélectionner uniquement les expériences, compétences et réalisations réellement utiles pour le poste.
        - Ignorer les éléments non pertinents, même s'ils sont dans le CV.

        2. Style :
        - Ton humain, naturel, direct, fluide.
        - S'inspirer du style de l'exemple fourni si disponible, sans copier.
        - Bannir les clichés (“motivation sans faille”, “véritable passion”, etc.).
        - Ne jamais dire que le texte est généré par une IA.

        3. Structure :
        - Lettre claire, professionnelle, aérée, avec une logique narrative cohérente.
        - Paragraphes construits autour d'idées fortes.

        4. Correction :
        - Orthographe, grammaire, formulation impeccables.

        5. Langue :
        - Si l'offre est en anglais → lettre en anglais.
        - Sinon → lettre en français.

        6. Ultra-adaptation :
        - Comprendre le contexte du poste et les besoins de l'entreprise.
        - Montrer précisément ce que l'utilisateur apporte.

        FORMATTAGE OBLIGATOIRE :
        Le résultat final doit apparaître EXCLUSIVEMENT entre les balises suivantes :

        [DEBUT]
        (UNIQUEMENT la lettre complète ici)
        [FIN]

        Règles :
        - Aucune explication en dehors de [DEBUT] et [FIN].
        - Aucun commentaire ni texte additionnel.
        - Le contenu doit être directement prêt à utilisation.
        """


    
class Scrapper:
    @staticmethod
    def scrap_wtj(soup):
        compagny = soup.find('div', attrs={'data-testid': 'job-metadata-block'}).get_text()
        job_description = soup.find("div", id="the-position-section").get_text()
        content = compagny + job_description
        return content

    @staticmethod
    def scrap_hellowork(soup):
        title_company = soup.find("h1", class_="tw-inline tw-scroll-mt-[4.5rem]").get_text()
        job_description = soup.find("div", class_="tw-leading-relaxed tw-line-clamp-[17] sm:tw-line-clamp-[20] tw-typo-long-m").get_text()
        profil = soup.find("div", class_="tw-overflow-hidden peer-checked:tw-mt-2 tw-max-h-0 tw-opacity-0 tw-transition-all tw-ease-in-out tw-duration-400 peer-checked:tw-max-h-[3000px] peer-checked:tw-opacity-100").get_text()
        content = title_company + job_description + profil
        return content
    

    @staticmethod
    def scrap_linkedin(soup):
        pass
        # return content
    
    @staticmethod
    def scrap_indeed(soup):
        content = soup.find("div", class_='jobsearch-JobComponent-description css-dyse26 eu4oa1w0').get_text()
        return content
    
    @staticmethod
    def scrap_if_needed(job_description : str):
        if Functions.is_url(job_description):
            print("[INFO] The job description is a URL, scrapping it...")
            return Scrapper.scrape_job_description(job_description)
        print("[INFO] The job description is already provided.")
        return job_description, True
    
    
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
                text_content = Scrapper.scrap_wtj(soup)
            elif "hellowork" in domain or "regionsjob" in domain:
                text_content = Scrapper.scrap_hellowork(soup)
            else:
                return f"[ERROR] Site pas pris en compte, on peut scrap que :\nWelcomeToTheJungle, HelloWork", False

            # Nettoyage de texte
            text_content = "\n".join(line.strip() for line in text_content.splitlines() if line.strip())
            if len(text_content) < 200:
                print("[WARN] Description semble incomplète ou courte.")
                return f"[ERROR] Vous devez copier la description du poste\n On n'a pas pu extraire les données de {url}", False

            print(f"[INFO] Description :\n {text_content}")
            return text_content, True
    
        except Exception as e:
            return f"[ERROR] Vous devez copier la description du poste\n On n'a pas pu extraire les données de {url}", False
        
class Functions:
    @staticmethod
    def get_normalized_content(job_description: str, resume: str, guidelines: str = "") -> str:
        content = Config.PRE_PROMPT + f"""
        Voici l'offre d'emploi ou le poste visé :
        {job_description}
        Voici les expériences complètes de l'utilisateur :
        {resume}
        """
        if guidelines:
            content += f"""
            Voici des instructions fournies par l'utilisateur :
            {guidelines}
            """
        return content

    @staticmethod
    def is_url(url_string: str) -> bool:
        try:
            result = urlparse(url_string)
            return result.scheme in ['http', 'https'] and bool(result.netloc)
        except ValueError:
            return False
        