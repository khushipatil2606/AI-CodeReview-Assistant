from module.gemini_service import generate_response


def generate_revision_sheet(topic, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert university professor.

ONLY use the study material below.

Study Material:
{context}

Topic:
{topic}

Generate a revision sheet.

The revision sheet should include:

1. Short Definition
2. Important Points
3. Key Concepts
4. Keywords
5. Advantages
6. Disadvantages
7. Important Exam Tips
8. Quick Summary

Rules:

- Use bullet points.
- Keep each point short.
- Use simple language.
- Do not use information outside the study material.
- Make it suitable for last-minute exam revision.

Return only the revision sheet.
"""

    return generate_response(prompt)