from fastapi import APIRouter

from services.chat_service import ChatService


router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


chat_service = ChatService()


@router.post("/{owner}/{repo}")
def chat_with_file(
    owner: str,
    repo: str,
    file_path: str,
    question: str
):

    try:

        return chat_service.ask_question(
            owner,
            repo,
            file_path,
            question
        )

    except Exception as e:

        return {
            "error": str(e)
        }