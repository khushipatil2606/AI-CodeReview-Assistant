from services.gemini_service import GeminiService


class AIReviewService:

    def __init__(self):
        self.gemini = GeminiService()

    def review(self, files):

        code = ""

        for file in files:
            code += f"\n\nFile: {file['filename']}\n"

            if file.get("patch"):
                code += file["patch"]

        if not code.strip():
            code = "No code changes available."

        result = self.gemini.review_code(code)

        return {
            "review": result
        }