import json
import time

from services.gemini_service import GeminiService
from services.github_service import GitHubService
from prompts.bugfix_prompt import BUGFIX_PROMPT


class BugFixService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def analyze_bugfixes(
        self,
        owner: str,
        repo: str
    ):

        files = self.github.get_repository_structure(
            owner,
            repo
        )

        repository = ""

        for file in files:

            repository += (
                f"\n\nFile: {file.get('filename', '')}\n"
            )

            if file.get("patch"):
                repository += file["patch"][:1500]

        if not repository.strip():
            repository = "Repository is empty."

        prompt = f"""
{BUGFIX_PROMPT}

Repository:

{repository}
"""

        response = None

        # Retry Gemini API up to 3 times
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
                        f"Gemini busy. "
                        f"Retrying... ({attempt + 1}/3)"
                    )

                    time.sleep(5)

                else:

                    raise e

        if response is None:

            raise Exception(
                "Gemini API is unavailable after 3 attempts."
            )

        text = response.text.strip()

        text = (
            text
            .replace("```json", "")
            .replace("```JSON", "")
            .replace("```", "")
            .strip()
        )

        try:

            return json.loads(text)

        except json.JSONDecodeError:

            return {
                "score": 0,
                "bugs": [],
                "fixes": [],
                "summary": text
            }