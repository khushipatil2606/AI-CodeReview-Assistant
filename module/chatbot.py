from module.gemini_service import generate_response


def chat_with_pdf(question, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an AI Tutor.

Use ONLY the study material below.

Study Material:

{context}

Question:

{question}

Rules:

1. Answer only using the uploaded PDF.
2. Keep the explanation simple.
3. Give examples if possible.
4. If the answer is not available in the PDF, reply:
"I couldn't find this information in the uploaded study material."
"""

    return generate_response(prompt)