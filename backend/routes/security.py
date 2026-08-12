from fastapi import APIRouter

from services.security_service import SecurityService


router = APIRouter(
    prefix="/security",
    tags=["Security"]
)

security_service = SecurityService()


# =========================================================
# SECURITY ANALYSIS
# =========================================================

@router.post("/{owner}/{repo}")
def analyze_security(
    owner: str,
    repo: str
):
    try:

        result = security_service.analyze_security(
            owner,
            repo
        )

        return result

    except Exception as e:

        return {
            "error": str(e)
        }