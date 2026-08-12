import json
import time

from services.gemini_service import GeminiService
from services.github_service import GitHubService
from prompts.security_prompt import SECURITY_PROMPT


class SecurityService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def analyze_security(self, owner: str, repo: str):

        # -----------------------------------------
        # Get repository files
        # -----------------------------------------

        files = self.github.get_repository_structure(
            owner,
            repo
        )

        repository = ""

        for file in files:

            filename = file.get("filename", "")

            repository += f"\n\nFile: {filename}\n"

            if file.get("patch"):
                repository += file["patch"][:1500]

        if not repository.strip():
            repository = "Repository structure only."

        # -----------------------------------------
        # Create AI prompt
        # -----------------------------------------

        prompt = f"""
{SECURITY_PROMPT}

Repository:

{repository}
"""

        # -----------------------------------------
        # Gemini API call with retry
        # -----------------------------------------

        response = None

        for attempt in range(3):

            try:

                response = self.gemini.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )

                break

            except Exception as e:

                if "503" in str(e):

                    print(
                        f"Gemini service busy. "
                        f"Retrying... ({attempt + 1}/3)"
                    )

                    time.sleep(5)

                else:

                    raise e

        if response is None:

            raise Exception(
                "Gemini API is unavailable after 3 attempts."
            )

        # -----------------------------------------
        # Read AI response
        # -----------------------------------------

        text = response.text.strip()

        # Remove Markdown JSON blocks

        text = (
            text
            .replace("```json", "")
            .replace("```JSON", "")
            .replace("```", "")
            .strip()
        )

        # -----------------------------------------
        # Convert response to JSON
        # -----------------------------------------

        try:

            return json.loads(text)

        except json.JSONDecodeError:

            return {
                "score": 0,
                "vulnerabilities": [],
                "secrets": [],
                "authentication": [],
                "recommendations": [],
                "summary": text
            }