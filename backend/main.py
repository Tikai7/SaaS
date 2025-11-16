import os
from groq import Groq, GroqError
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import Config, Functions, Scrapper

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
groq_client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

@app.get("/")
def root():
    return {"message": "Hello from Tikai's backend !"}

@app.get("/models")
def get_available_models():
    return Config.AVAILABLE_MODELS

@app.post("/groq")
def get_cover_letter(user_prompt: dict):
    print(f"[INFO] Retriving data from user prompt...")

    job_description = user_prompt.get("job_description", "")
    resume = user_prompt.get("resume", "")
    guidelines = user_prompt.get("guidelines", "")

    print(f"[INFO] Normalizing content...")


    job_description, state = Scrapper.scrap_if_needed(job_description)
    content = Functions.get_normalized_content(job_description, resume, guidelines)

    if not state:
        return {
            "content": job_description,
            "used_model" : "None"
        }
    try:
        print(f"[INFO] Groq API Call using {Config.AVAILABLE_MODELS[Config.CURRENT_MODEL_INDEX]}...")
        response = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": content}],
            model=Config.AVAILABLE_MODELS[Config.CURRENT_MODEL_INDEX],
        )
        print(f"[INFO] Done.")
    except GroqError as e:
        print(f"[ERROR] {e}")
        Config.CURRENT_MODEL_INDEX += 1
        if Config.CURRENT_MODEL_INDEX >= len(Config.AVAILABLE_MODELS):
            Config.CURRENT_MODEL_INDEX = 0
            return {
                "content": "[ERROR] Désolé, tous les modèles ont atteint leur limite d'utilisation. Veuillez réessayer dans 1 minute.",
                "used_model" : "None"
            }
        return get_cover_letter(user_prompt)
        
    return {
        "content": response.choices[0].message.content,
        "used_model": Config.AVAILABLE_MODELS[Config.CURRENT_MODEL_INDEX]
    }
