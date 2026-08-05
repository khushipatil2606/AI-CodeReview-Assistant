from services.gemini_service import GeminiService

gemini = GeminiService()

sample_code = """
def add(a,b):
    return a+b
"""

print(gemini.review_code(sample_code))