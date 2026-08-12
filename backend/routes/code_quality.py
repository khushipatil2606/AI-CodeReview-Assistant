from fastapi import APIRouter

from services.github_service import GitHubService
from services.code_quality_service import CodeQualityService


router = APIRouter(
    prefix="/code-quality",
    tags=["Code Quality"]
)


github = GitHubService()
code_quality = CodeQualityService()


@router.post("/{owner}/{repo}")
def analyze_code_quality(
    owner: str,
    repo: str
):

    try:

        # Get repository files
        files = github.get_repository_structure(
            owner,
            repo
        )

        # Check repository
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

        # Analyze code quality with Gemini
        result = code_quality.analyze(
            owner,
            repo
        )

        return result

    except Exception as e:

        return {
            "score": 0,
            "strengths": [],
            "issues": [
                str(e)
            ],
            "recommendations": [],
            "summary": "Code quality analysis failed."
        }