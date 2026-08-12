from fastapi import APIRouter

from services.github_service import GitHubService
from services.ai_review import AIReviewService

from database.database import SessionLocal
from database.models import ReviewHistory


router = APIRouter(
    prefix="/review",
    tags=["Review"]
)

github = GitHubService()
ai = AIReviewService()


# =========================================================
# 1. AI REVIEW
# =========================================================

@router.post("/{owner}/{repo}/{pr_number}")
def review_pull_request(
    owner: str,
    repo: str,
    pr_number: int
):

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
            bugs="\n".join(result.get("bugs", [])),
            security="\n".join(result.get("security", [])),
            performance="\n".join(result.get("performance", [])),
            summary=result["summary"]
        )

        db.add(review)
        db.commit()
        db.refresh(review)

        db.close()

        return result

    except Exception as e:

        return {
            "error": str(e)
        }


# =========================================================
# 2. REVIEW HISTORY
# =========================================================

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


# =========================================================
# 3. REVIEW STATISTICS
# =========================================================

@router.get("/statistics")
def review_statistics():

    db = SessionLocal()

    reviews = (
        db.query(ReviewHistory)
        .order_by(ReviewHistory.id.desc())
        .all()
    )

    db.close()

    total_reviews = len(reviews)

    if total_reviews == 0:

        return {
            "total_reviews": 0,
            "average_score": 0,
            "bugs": 0,
            "security": 0,
            "performance": 0
        }

    average_score = round(
        sum(review.score for review in reviews) / total_reviews,
        2
    )

    total_bugs = sum(
        len(review.bugs.split("\n"))
        if review.bugs else 0
        for review in reviews
    )

    total_security = sum(
        len(review.security.split("\n"))
        if review.security else 0
        for review in reviews
    )

    total_performance = sum(
        len(review.performance.split("\n"))
        if review.performance else 0
        for review in reviews
    )

    return {
        "total_reviews": total_reviews,
        "average_score": average_score,
        "bugs": total_bugs,
        "security": total_security,
        "performance": total_performance
    }


# =========================================================
# 4. GET REVIEW DETAILS
# =========================================================

@router.get("/{review_id}")
def get_review_details(review_id: int):

    db = SessionLocal()

    review = (
        db.query(ReviewHistory)
        .filter(ReviewHistory.id == review_id)
        .first()
    )

    db.close()

    if not review:

        return {
            "error": "Review not found"
        }

    return {
        "id": review.id,
        "repository": review.repository,
        "score": review.score,
        "bugs": review.bugs,
        "security": review.security,
        "performance": review.performance,
        "summary": review.summary,
        "created_at": str(review.created_at)
    }