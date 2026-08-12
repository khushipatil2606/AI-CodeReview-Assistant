from fastapi import APIRouter

from services.bugfix_service import BugFixService


router = APIRouter(
    prefix="/bugfix",
    tags=["Bug Fix"]
)


bugfix = BugFixService()


@router.post("/{owner}/{repo}")
def analyze_bugfix(
    owner: str,
    repo: str
):

    try:

        result = bugfix.analyze_bugfixes(
            owner,
            repo
        )

        return result

    except Exception as e:

        return {
            "error": str(e)
        }