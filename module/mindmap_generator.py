from module.gemini_service import generate_response


def generate_mindmap(topic, retrieved_chunks):

    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
You are an expert professor.

ONLY use the study material below.

Study Material:
{context}

Topic:
{topic}

Generate a Mermaid Mind Map.

Rules:

1. Output only Mermaid syntax.
2. Start with:

mindmap
  root((Topic))

3. Add main concepts.
4. Add subtopics.
5. Keep the hierarchy clear.
6. Do not add explanations outside the Mermaid code.

Example:

mindmap
  root((Deadlock))
    Definition
      Waiting forever
    Conditions
      Mutual Exclusion
      Hold and Wait
      No Preemption
      Circular Wait
    Prevention
    Avoidance
    Detection
"""

    return generate_response(prompt)