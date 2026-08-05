import google.generativeai as genai
from config import GEMINI_API_KEY, MODEL_NAME

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Load Model
model = genai.GenerativeModel(MODEL_NAME)


def generate_response(prompt):
    """
    Generates AI response from Gemini.
    """

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Error : {e}"