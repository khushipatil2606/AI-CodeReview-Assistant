from fastapi import APIRouter

from services.dependency_service import DependencyService


router = APIRouter(
    prefix="/dependency",
    tags=["Dependency"]
)

dependency_service = DependencyService()


@router.post("/{owner}/{repo}")
def analyze_dependency(
    owner: str,
    repo: str
):
    try:

        result = dependency_service.analyze_dependencies(
            owner,
            repo
        )

        return result

    except Exception as e:

        return {
            "error": str(e)
        }