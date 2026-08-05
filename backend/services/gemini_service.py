from google import genai
from config import GEMINI_API_KEY


class GeminiService:

    def __init__(self):
        self.client = genai.Client(api_key=GEMINI_API_KEY)

    def review_code(self, code):

        prompt = f"""
You are an expert Senior Software Engineer.

Review the following code.

Return the response in exactly this format:

Overall Score: <score>/100

Bugs:
- ...

Security:
- ...

Performance:
- ...

Summary:
...

Code:
{code}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return response.text