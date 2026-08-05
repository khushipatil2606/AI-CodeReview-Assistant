from fastapi import APIRouter
from services.github_service import GitHubService
from services.ai_review import AIReviewService

from database.database import SessionLocal
from database.models import ReviewHistory

router = APIRouter(prefix="/review", tags=["Review"])

github = GitHubService()
ai = AIReviewService()


# ---------------- AI REVIEW ----------------

@router.post("/{owner}/{repo}/{pr_number}")
def review_pull_request(owner: str, repo: str, pr_number: int):

    try:
        files = github.get_pull_request_files(
            owner,
            repo,
            pr_number
        )

        result = ai.review(files)

        db = SessionLocal()

        review = ReviewHistory(
            repository=f"{owner}/{repo}",
            score=result["score"],
            bugs="\n".join(result["bugs"]),
            security="\n".join(result["security"]),
            performance="\n".join(result["performance"]),
            summary=result["summary"]
        )

        db.add(review)
        db.commit()
        db.close()

        return result

    except Exception as e:
        return {
            "error": str(e)
        }


# ---------------- REVIEW HISTORY ----------------

@router.get("/history")
def review_history():

    db = SessionLocal()

    reviews = (
        db.query(ReviewHistory)
        .order_by(ReviewHistory.id.desc())
        .all()
    )

    db.close()

    return [
        {
            "id": review.id,
            "repository": review.repository,
            "score": review.score,
            "bugs": review.bugs,
            "security": review.security,
            "performance": review.performance,
            "summary": review.summary,
            "created_at": str(review.created_at)
        }
        for review in reviews
    ]