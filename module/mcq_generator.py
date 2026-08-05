from module.gemini_service import generate_response


def generate_mcqs(topic, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert university professor.

ONLY use the study material below.

Study Material:
{context}

Topic:
{topic}

Generate exactly 20 MCQs.

Each MCQ must follow this format:

Question 1

Question:
...

A.

B.

C.

D.

Correct Answer:

Explanation:

Rules:

1. Use only the provided study material.
2. One correct answer.
3. Explanation should be short.
4. Don't use outside knowledge.

Return only MCQs.
"""

    return generate_response(prompt)