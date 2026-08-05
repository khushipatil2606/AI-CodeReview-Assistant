from module.database import get_history


def get_statistics():

    history = get_history()

    stats = {
        "Notes": 0,
        "Flashcards": 0,
        "MCQs": 0,
        "Revision": 0,
        "Mind Map": 0,
        "Quiz": 0,
        "Study Planner": 0,
        "Interview": 0,
        "AI Tutor": 0,
        "Exam Predictor": 0
    }

    for row in history:

        content_type = row[2]

        if content_type in stats:
            stats[content_type] += 1

    return stats