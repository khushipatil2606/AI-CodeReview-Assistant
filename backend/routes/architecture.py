from fastapi import APIRouter
from services.github_service import GitHubService
from services.architecture import ArchitectureService

router = APIRouter(
    prefix="/architecture",
    tags=["Architecture"]
)

github = GitHubService()
architecture = ArchitectureService()


@router.post("/{owner}/{repo}")
def review_architecture(owner: str, repo: str):

    try:

        # Get repository source code
        files = github.get_repository_structure(owner, repo)

        if len(files) == 0:
            return {
                "score": 0,
                "strengths": [],
                "issues": [
                    "Repository is empty or source code could not be read."
                ],
                "recommendations": [
                    "Ensure the repository contains readable source code."
                ],
                "summary": "No repository content available."
            }

        # Analyze with Gemini
        result = architecture.review(files)

        return result

    except Exception as e:

        return {
            "score": 0,
            "strengths": [],
            "issues": [
                str(e)
            ],
            "recommendations": [],
            "summary": "Architecture analysis failed."
        }