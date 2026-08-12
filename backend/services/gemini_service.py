import json

from google import genai

from config import GEMINI_API_KEY


class GeminiService:

    def __init__(self):
        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

    def review_code(self, code):

        prompt = f"""
You are a Senior Software Engineer.

Review the following code.

Return ONLY valid JSON.

Example:

{{
    "score":95,
    "bugs":["Bug 1"],
    "security":["Security Issue"],
    "performance":["Performance Issue"],
    "summary":"Short summary"
}}

Code:

{code}
"""

        response = self.client.models.generate_content(
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
                "bugs": ["Unable to parse Gemini response."],
                "security": [],
                "performance": [],
                "summary": text
            }
    # ---------------- GET PROFILE ----------------

def get_profile(self):

    if not self.github:
        return {
            "error": "GitHub token not configured."
        }

    user = self.get_user()

    return {
        "login": user.login,
        "name": user.name,
        "bio": user.bio,
        "avatar": user.avatar_url,
        "followers": user.followers,
        "following": user.following,
        "public_repos": user.public_repos,
        "profile": user.html_url,
        "company": user.company,
        "location": user.location
    }