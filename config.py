import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ===============================
# Gemini API Key
# ===============================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY is None:
    raise ValueError(
        "Gemini API Key not found! Please add it to the .env file."
    )

# ===============================
# Project Directories
# ===============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_DIR = os.path.join(BASE_DIR, "data")
UPLOAD_DIR = os.path.join(DATA_DIR, "uploaded_pdfs")
SAMPLE_NOTES_DIR = os.path.join(DATA_DIR, "sample_notes")

VECTOR_STORE_DIR = os.path.join(BASE_DIR, "vector_store")

OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

DATABASE_DIR = os.path.join(BASE_DIR, "database")
DATABASE_PATH = os.path.join(DATABASE_DIR, "studymate.db")

ASSETS_DIR = os.path.join(BASE_DIR, "assets")

# ===============================
# Automatically Create Folders
# ===============================

folders = [
    DATA_DIR,
    UPLOAD_DIR,
    SAMPLE_NOTES_DIR,
    VECTOR_STORE_DIR,
    OUTPUT_DIR,
    DATABASE_DIR,
    ASSETS_DIR,
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

# ===============================
# AI Settings
# ===============================

MODEL_NAME = "gemini-2.5-flash"

EMBEDDING_MODEL = "all-MiniLM-L6-v2"

CHUNK_SIZE = 800

CHUNK_OVERLAP = 100