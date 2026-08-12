import json

from services.gemini_service import GeminiService
from prompts.architecture_prompt import ARCHITECTURE_PROMPT


class ArchitectureService:

    def __init__(self):
        self.gemini = GeminiService()

    def review(self, files):

        repository = ""

        for file in files:

            repository += (
                f"\n\nFile: {file.get('filename', '')}\n"
            )

            if file.get("patch"):
                repository += file["patch"][:1500]

        if not repository.strip():
            repository = "Repository structure only."

        prompt = f"""
{ARCHITECTURE_PROMPT}

Repository:

{repository}
"""

        response = self.gemini.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            return json.loads(text)

        except Exception:
            return {
                "score": 0,
                "strengths": [],
                "issues": [
                    "Gemini returned an invalid JSON response."
                ],
                "recommendations": [
                    "Retry the analysis."
                ],
                "summary": text
            }