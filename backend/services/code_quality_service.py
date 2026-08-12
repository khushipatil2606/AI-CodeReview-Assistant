import json

from services.gemini_service import GeminiService
from services.github_service import GitHubService
from prompts.code_quality_prompt import CODE_QUALITY_PROMPT


class CodeQualityService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def analyze(self, owner: str, repo: str):

        files = self.github.get_repository_structure(
            owner,
            repo
        )

        repository = ""

        for file in files:

            repository += f"\n\nFile: {file['filename']}\n"

            if file.get("patch"):
                repository += file["patch"][:1500]

        if not repository.strip():
            repository = "Repository is empty."

        prompt = f"""
{CODE_QUALITY_PROMPT}

Repository:

{repository}
"""

        response = self.gemini.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        text = (
            text.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            return json.loads(text)

        except Exception:
            return {
                "score": 0,
                "strengths": [],
                "issues": [],
                "recommendations": [],
                "summary": text
            }