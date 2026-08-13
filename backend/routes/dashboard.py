from fastapi import APIRouter
from services.github_service import GitHubService
from database.database import SessionLocal
from database.models import ReviewHistory

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

github = GitHubService()


@router.get("")
def dashboard():

    # Get GitHub repositories
    repos = github.get_repositories() or []

    # Get GitHub profile
    profile = github.get_profile() or {}

    # Get review history from database
    db = SessionLocal()

    try:
        reviews = (
            db.query(ReviewHistory)
            .order_by(ReviewHistory.id.desc())
            .all()
        )
    finally:
        db.close()

    return {
        "repositories": len(repos),

        # Use .get() so missing GitHub fields don't crash the dashboard
        "followers": profile.get("followers", 0),

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