from fastapi import APIRouter, Query

from services.explain_service import ExplainService
from services.github_service import GitHubService


router = APIRouter(
    prefix="/explain",
    tags=["AI Explain"]
)


explain_service = ExplainService()
github_service = GitHubService()


# ---------------- GET FILES ----------------

@router.get("/{owner}/{repo}/files")
def get_repository_files(
    owner: str,
    repo: str
):

    try:

        files = github_service.get_repository_structure(
            owner,
            repo
        )

        return [
            file["filename"]
            for file in files
            if file.get("filename")
        ]

    except Exception as e:

        return {
            "error": str(e)
        }


# ---------------- EXPLAIN FILE ----------------

@router.post("/{owner}/{repo}")
def explain_file(
    owner: str,
    repo: str,
    file_path: str = Query(...)
):

    try:

        return explain_service.explain_file(
            owner,
            repo,
            file_path
        )

    except Exception as e:

        return {
            "error": str(e)
        }