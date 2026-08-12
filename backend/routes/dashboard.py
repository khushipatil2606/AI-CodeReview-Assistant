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

    repos = github.get_repositories()

    profile = github.get_profile()

    db = SessionLocal()

    reviews = (
        db.query(ReviewHistory)
        .order_by(ReviewHistory.id.desc())
        .all()
    )

    db.close()

    return {
        "repositories": len(repos),
        "followers": profile["followers"],
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