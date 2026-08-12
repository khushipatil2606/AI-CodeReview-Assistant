import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# GitHub Configuration
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")

# URLs
GITHUB_API = os.getenv("GITHUB_API")
FRONTEND_URL = os.getenv("FRONTEND_URL")

# Gemini Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Debug (Temporary)
if GEMINI_API_KEY:
    print(f"✅ Gemini API Key Loaded: {GEMINI_API_KEY[:10]}...")
else:
    print("❌ GEMINI_API_KEY not found! Check your .env file.")