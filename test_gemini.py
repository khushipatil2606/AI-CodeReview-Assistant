from module.gemini_service import generate_response

prompt = """
Explain CPU Scheduling with examples.
"""


response = generate_response(prompt)

print(response)