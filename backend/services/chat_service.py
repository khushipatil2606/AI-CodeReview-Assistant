import json

from services.github_service import GitHubService
from services.gemini_service import GeminiService


class ChatService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def ask_question(
        self,
        owner: str,
        repo: str,
        file_path: str,
        question: str
    ):

        # Get repository files
        files = self.github.get_repository_structure(
            owner,
            repo
        )

        # Find selected file
        selected_file = None

        for file in files:

            if file.get("filename") == file_path:
                selected_file = file
                break

        # File not found
        if selected_file is None:

            return {
                "error": f"File '{file_path}' was not found."
            }

        # Get code
        code = selected_file.get(
            "patch",
            ""
        )

        if not code:

            return {
                "error": "No readable code found in this file."
            }

        # Limit code size
        code = code[:12000]

        # Create AI prompt
        prompt = f"""
You are an expert software engineer.

The user is asking a question about one source code file.

Repository:
{owner}/{repo}

File:
{file_path}

Source Code:
{code}

User Question:
{question}

Instructions:

1. Answer ONLY using the provided source code.
2. Do not invent functionality that is not present.
3. Explain technical concepts clearly.
4. If the answer cannot be determined from the file, say so.
5. Keep the answer practical and easy to understand.

Return ONLY valid JSON:

{{
    "answer": "Your detailed answer here"
}}
"""

        # Ask Gemini
        response = self.gemini.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        # Remove Markdown code fences
        text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        # Parse response
        try:

            result = json.loads(text)

            return {
                "answer": result.get(
                    "answer",
                    "No answer generated."
                )
            }

        except Exception:

            # Fallback if Gemini returns plain text
            return {
                "answer": text
            }