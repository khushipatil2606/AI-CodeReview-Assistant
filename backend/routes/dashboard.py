from fastapi import APIRouter, Request

from services.github_service import GitHubService
from database.database import SessionLocal
from database.models import ReviewHistory


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_github_service(request: Request):

    auth_header = request.headers.get("Authorization")

    token = None

    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.replace("Bearer ", "").strip()

    return GitHubService(token)


@router.get("")
def dashboard(request: Request):

    github = get_github_service(request)

    repos = github.get_repositories()
    profile = github.get_profile()

    # Handle GitHub API errors safely
    if isinstance(repos, dict):
        repos = []

    if isinstance(profile, dict):
        followers = profile.get("followers", 0)
    else:
        followers = 0

    db = SessionLocal()

    try:

        reviews = (
            db.query(ReviewHistory)
            .order_by(ReviewHistory.id.desc())
            .all()
        )

        return {
            "repositories": len(repos),
            "followers": followers,
            "reviews": len(reviews),

            "latest_reviews": [
                {
                    "score": r.score,
                    "repository": r.repository
                }
                for r in reviews[:5]
            ],

            "latest_repositories": repos[:5]
        }

    finally:

        db.close()