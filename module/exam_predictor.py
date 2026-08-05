from module.gemini_service import generate_response


def predict_exam(subject, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an experienced university professor.

Study Material:
{context}

Subject:
{subject}

Generate:

1. ⭐ Important Topics
2. 📝 Predicted 2-Mark Questions
3. 📚 Predicted 5-Mark Questions
4. 🎯 Predicted 10-Mark Questions
5. 🎤 Viva Questions
6. ✅ Revision Checklist

Return the answer in clean markdown.
"""

    return generate_response(prompt)