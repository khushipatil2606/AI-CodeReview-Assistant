import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")

GITHUB_API = os.getenv("GITHUB_API")
FRONTEND_URL = os.getenv("FRONTEND_URL")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")