from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.github import router as github_router
from routes.auth import router as auth_router
from database.database import engine
from database.models import Base
from routes.review import router as review_router
from database.database import engine
from database.models import Base
Base.metadata.create_all(bind=engine)
from config import GITHUB_TOKEN

print("TOKEN =", GITHUB_TOKEN)
app = FastAPI(
    title="AI Code Review Assistant API",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)
# 👇 Add this line here
app.include_router(github_router)
app.include_router(review_router)
app.include_router(auth_router)
# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Code Review Assistant API"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Backend is running successfully"
    }