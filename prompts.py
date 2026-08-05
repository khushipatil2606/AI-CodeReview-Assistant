"""
Prompt Templates for AI StudyMate
"""


def notes_prompt(subject, unit, topic):

    return f"""
You are an expert college professor.

Generate detailed notes for:

Subject : {subject}

Unit : {unit}

Topic : {topic}

Requirements:

1. Use headings.

2. Explain every concept.

3. Use simple language.

4. Include examples.

5. Include advantages.

6. Include disadvantages.

7. Add diagrams wherever possible using text.

8. End with a summary.

Return only the notes.
"""


def flashcard_prompt(subject, topic):

    return f"""
Generate 20 flashcards.

Subject:
{subject}

Topic:
{topic}

Format:

Question:

Answer:

Keep answers short.
"""



def mcq_prompt(subject, topic):

    return f"""
Generate 20 Multiple Choice Questions.

Subject:
{subject}

Topic:
{topic}

Each question must contain

Question

Option A

Option B

Option C

Option D

Correct Answer

Explanation
"""

def important_questions_prompt(subject, topic):

    return f"""
Generate important university exam questions.

Subject:
{subject}

Topic:
{topic}

Include

5 Easy

5 Medium

5 Hard

Return only questions.
"""


def revision_prompt(subject, topic):

    return f"""
Create one-page revision notes.

Subject:
{subject}

Topic:
{topic}

Use bullets.

Use short points.

Highlight keywords.

No long paragraphs.
"""

def mindmap_prompt(subject, topic):

    return f"""
Generate a Mermaid Mind Map.

Subject:
{subject}

Topic:
{topic}

Return only Mermaid syntax.

Example:

mindmap

 root((Topic))

   Subtopic

      Point

      Point
"""

