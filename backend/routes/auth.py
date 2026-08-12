from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import requests

from config import (
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    FRONTEND_URL
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ---------------- GitHub Login ----------------

@router.get("/github/login")
def github_login():

    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        "&scope=repo read:user"
    )

    return RedirectResponse(github_url)


# ---------------- GitHub Callback ----------------

@router.get("/github/callback")
def github_callback(code: str):

    response = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={
            "Accept": "application/json"
        },
        data={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code
        }
    )

    token = response.json()

    access_token = token.get("access_token")

    if not access_token:
        return {
            "error": "GitHub authentication failed."
        }

    return RedirectResponse(
        url=f"{FRONTEND_URL}/dashboard?token={access_token}"
    )