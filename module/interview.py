from module.gemini_service import generate_response


def generate_interview_questions(topic, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an experienced technical interviewer.

Study Material:

{context}

Topic:

{topic}

Generate exactly 5 interview questions.

Rules:

1. Questions should be conceptual.
2. Questions should be suitable for placement interviews.
3. Return only the questions.
"""

    return generate_response(prompt)


def evaluate_answer(question, answer):

    prompt = f"""
You are an interview evaluator.

Question:

{question}

Candidate Answer:

{answer}

Evaluate the answer.

Provide:

Score (out of 10)

Strengths

Weaknesses

Suggestions

Correct Answer

Keep the feedback concise.
"""

    return generate_response(prompt)