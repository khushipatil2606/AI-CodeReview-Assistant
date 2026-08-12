import json

from services.github_service import GitHubService
from services.gemini_service import GeminiService
from prompts.explain_prompt import EXPLAIN_PROMPT


class ExplainService:

    def __init__(self):
        self.github = GitHubService()
        self.gemini = GeminiService()

    def explain_file(self, owner: str, repo: str, file_path: str):

        # Get repository files
        files = self.github.get_repository_structure(owner, repo)

        # Find selected file
        selected_file = None

        for file in files:

            if file.get("filename") == file_path:
                selected_file = file
                break

        # File not found
        if selected_file is None:
            return {
                "error": f"File '{file_path}' was not found in the repository."
            }

        # Get file content
        content = selected_file.get("patch", "")

        if not content:
            return {
                "error": f"No readable content found for '{file_path}'."
            }

        # Limit content sent to Gemini
        content = content[:12000]

        prompt = f"""
{EXPLAIN_PROMPT}

You are explaining ONLY this file:

File:
{file_path}

Code:

{content}

IMPORTANT:

Analyze ONLY the file above.

Do NOT analyze other repository files.

Return ONLY one valid JSON object.

Do NOT return:
- Markdown
- ```json
- An array
- JSON inside a string

The response must have exactly this structure:

{{
    "summary": "Short explanation of the file",
    "purpose": "Purpose of the file",
    "flow": [
        "Step 1",
        "Step 2",
        "Step 3"
    ],
    "complexity": "Low",
    "improvements": [
        "Improvement 1",
        "Improvement 2"
    ]
}}
"""

        response = self.gemini.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini adds it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        try:

            result = json.loads(text)

            # Make sure the result is a dictionary
            if not isinstance(result, dict):

                return {
                    "error": "AI returned an invalid response format."
                }

            return {
                "summary": result.get(
                    "summary",
                    "No summary available."
                ),

                "purpose": result.get(
                    "purpose",
                    "No purpose information available."
                ),

                "flow": result.get(
                    "flow",
                    []
                ),

                "complexity": result.get(
                    "complexity",
                    "Unknown"
                ),

                "improvements": result.get(
                    "improvements",
                    []
                )
            }

        except json.JSONDecodeError:

            return {
                "summary": text,
                "purpose": "Unable to parse AI response.",
                "flow": [],
                "complexity": "Unknown",
                "improvements": []
            }