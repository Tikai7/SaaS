import os
from groq import Groq, GroqError
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import Config, Functions

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

from groq import GroqError

@app.post("/groq")
def get_cover_letter(user_prompt: dict):
    job_description = user_prompt.get("job_description", "")
    resume = user_prompt.get("resume", "")
    cover_letter_example = user_prompt.get("cover_letter_example", "")

    content = Functions.get_normalized_content(job_description, resume, cover_letter_example)

    try:
        response = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": content}],
            model=Config.AVAILABLE_MODELS[Config.CURRENT_MODEL_INDEX],
        )
    except GroqError as e:
        if "rate limit" in str(e).lower():
            Config.CURRENT_MODEL_INDEX += 1
            if Config.CURRENT_MODEL_INDEX >= len(Config.AVAILABLE_MODELS):
                Config.CURRENT_MODEL_INDEX = 0
                return {"error": "All models have been rate limited. Please try again in 1 minute."}
            return get_cover_letter(user_prompt)
        return {"error": str(e)}

    return {
        "content": response.choices[0].message.content,
        "used_model": Config.AVAILABLE_MODELS[Config.CURRENT_MODEL_INDEX]
    }
