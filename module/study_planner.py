from module.gemini_service import generate_response


def generate_study_plan(subject, exam_date, study_hours, difficulty):

    prompt = f"""
You are an expert study planner.

Create a day-wise study timetable.

Subject:
{subject}

Exam Date:
{exam_date}

Study Hours Per Day:
{study_hours}

Difficulty:
{difficulty}

Requirements:

1. Divide topics day-wise.
2. Include revision.
3. Include quiz practice.
4. Include last-day revision.
5. Keep the schedule realistic.
6. Return the timetable in Markdown format.
"""

    return generate_response(prompt)