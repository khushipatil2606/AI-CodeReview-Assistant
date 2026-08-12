import json

from services.github_service import GitHubService
from services.gemini_service import GeminiService
from prompts.dependency_prompt import DEPENDENCY_PROMPT


class DependencyService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def analyze_dependencies(self, owner: str, repo: str):

        # Get repository files
        files = self.github.get_repository_structure(
            owner,
            repo
        )

        # Find requirements.txt
        requirements = ""

        for file in files:

            filename = file.get("filename", "")

            if filename.lower() == "requirements.txt":

                if file.get("patch"):
                    requirements = file["patch"]

                elif file.get("content"):
                    requirements = file["content"]

                break

        # If requirements.txt is not found
        if not requirements.strip():

            return {
                "score": 100,
                "critical": [],
                "high": [],
                "medium": [],
                "low": [],
                "outdated": [],
                "recommendations": [
                    "No requirements.txt file was found in the repository."
                ],
                "summary": "Dependency analysis could not identify a requirements.txt file."
            }

        # Limit input size
        requirements = requirements[:10000]

        # Create AI prompt
        prompt = f"""
{DEPENDENCY_PROMPT}

Repository requirements.txt:

{requirements}
"""

        # Generate AI response
        response = self.gemini.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        # Remove markdown JSON fences if Gemini adds them
        text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        # Convert JSON response into Python dictionary
        return json.loads(text)