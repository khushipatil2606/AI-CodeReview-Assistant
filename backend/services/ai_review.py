from services.gemini_service import GeminiService


class AIReviewService:

    def __init__(self):
        self.gemini = GeminiService()

    def review(self, files):

        code = ""

        for file in files:

            code += f"\n\nFile: {file['filename']}\n"

            if file.get("patch"):
                patch = file["patch"]

                # Limit code size
                code += patch[:2000]

        if not code.strip():
            code = "No code changes."

        result = self.gemini.review_code(code)

        return {
            "score": result.get("score", 0),
            "bugs": result.get("bugs", []),
            "security": result.get("security", []),
            "performance": result.get("performance", []),
            "summary": result.get("summary", "")
        }