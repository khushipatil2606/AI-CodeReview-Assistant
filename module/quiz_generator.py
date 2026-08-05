from module.gemini_service import generate_response


def generate_quiz(topic, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert professor.

ONLY use the study material below.

Study Material:
{context}

Topic:
{topic}

Generate exactly 10 MCQs.

Return ONLY valid JSON.

Format:

[
 {{
   "question":"...",
   "options":[
      "A",
      "B",
      "C",
      "D"
   ],
   "answer":"Correct Option"
 }}
]

Do not write explanations.
"""

    return generate_response(prompt)