from module.gemini_service import generate_response


def generate_flashcards(question, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert professor.

Use ONLY the study material below.

Study Material:

{context}

Topic:
{question}

Generate exactly 20 flashcards.

Format:

Flashcard 1

Question:
...

Answer:
...

Flashcard 2

Question:
...

Answer:
...

Rules:
- Keep answers under 40 words.
- Use simple language.
- Don't add information outside the study material.
"""

    return generate_response(prompt)