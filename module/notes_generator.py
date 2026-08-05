from module.gemini_service import generate_response


def generate_notes(question, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert college professor.

Answer ONLY using the study material below.

Study Material

{context}

Student Question

{question}

Explain in simple language.

Use headings.

Use bullet points.

Give examples.

Return only notes.
"""

    answer = generate_response(prompt)

    return answer