from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import requests

from config import (
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/github/login")
def github_login():

    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        "&scope=repo read:user"
    )

    return RedirectResponse(github_url)


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

    return response.json()