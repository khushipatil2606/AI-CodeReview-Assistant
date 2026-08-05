import os
import random
from datetime import datetime

import pandas as pd
import plotly.express as px
import sqlite3
import streamlit as st

# ==========================
# AI StudyMate Modules
# ==========================

from module.auth import (
    create_user_table,
    register_user,
    login_user
)

from module.analytics import get_statistics

from module.chatbot import chat_with_pdf

from module.chunking import create_chunks

from module.database import (
    create_database,
    save_history,
    get_history,
    get_content,
    delete_history
)

from module.exam_predictor import predict_exam

from module.export import (
    export_pdf,
    export_docx
)

from module.flashcard_generator import (
    generate_flashcards
)

from module.interview import (
    generate_interview_questions,
    evaluate_answer
)

from module.mcq_generator import (
    generate_mcqs
)

from module.mindmap_generator import (
    generate_mindmap
)

from module.notes_generator import (
    generate_notes
)

from module.pdf_manager import (
    list_uploaded_pdfs
)

from module.pdf_reader import (
    save_uploaded_file,
    extract_text
)

from module.quiz_generator import (
    generate_quiz
)

from module.rag import VectorStore

from module.revision_generator import (
    generate_revision_sheet
)

from module.study_planner import (
    generate_study_plan
)

# ====================================================
# Page Configuration
# ====================================================

st.set_page_config(
    page_title="AI StudyMate",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ====================================================
# Load CSS
# ====================================================

def load_css():
    if os.path.exists("assets/style.css"):
        with open("assets/style.css") as css:
            st.markdown(
                f"<style>{css.read()}</style>",
                unsafe_allow_html=True
            )

load_css()

# ====================================================
# Database Initialization
# ====================================================

create_database()
create_user_table()

# ====================================================
# Dashboard Card
# ====================================================

def dashboard_card(title, value, emoji):

    st.markdown(
        f"""
        <div style="
            background:#1f2937;
            color:white;
            padding:22px;
            border-radius:18px;
            border-left:6px solid #4CAF50;
            text-align:center;
            margin-bottom:18px;
            box-shadow:0 4px 15px rgba(0,0,0,.3);
        ">

        <h3 style="margin-bottom:12px;color:white;">
            {emoji} {title}
        </h3>

        <h1 style="
            color:#4CAF50;
            font-size:42px;
            margin:0;
        ">
            {value}
        </h1>

        </div>
        """,
        unsafe_allow_html=True
    )

# ====================================================
# Session State
# ====================================================

DEFAULT_SESSION = {

    "logged_in": False,

    "username": "",

    "theme": "Light",

    "store": None

}

for key, value in DEFAULT_SESSION.items():

    if key not in st.session_state:

        st.session_state[key] = value

# ====================================================
# Main Header
# ====================================================

st.title("📚 AI StudyMate")

st.caption(
    "Your Personal AI Learning Assistant"
)

st.markdown(
"""
Generate **Notes • Flashcards • MCQs • Revision Sheets • Mind Maps • Quiz • AI Tutor • Study Planner • Interview Preparation • Exam Prediction**
"""
)

st.divider()

# ====================================================
# Sidebar Authentication
# ====================================================

st.sidebar.title("🔐 Account")

auth_mode = st.sidebar.radio(

    "Choose Option",

    [

        "Login",

        "Register"

    ]

)

username = st.sidebar.text_input(

    "Username"

)

password = st.sidebar.text_input(

    "Password",

    type="password"

)

# ====================================================
# Register
# ====================================================

if auth_mode == "Register":

    if st.sidebar.button("Create Account"):

        if register_user(username, password):

            st.sidebar.success(
                "Registration Successful"
            )

        else:

            st.sidebar.error(
                "Username already exists."
            )

# ====================================================
# Login
# ====================================================

else:

    if st.sidebar.button("Login"):

        user = login_user(username, password)

        if user:

            st.session_state.logged_in = True

            st.session_state.username = username

            st.rerun()

        else:

            st.sidebar.error(
                "Invalid Username or Password"
            )

# ====================================================
# Stop if User is not Logged In
# ====================================================

if not st.session_state.logged_in:

    st.info(
        "👈 Please login from the sidebar."
    )

    st.stop()

# ====================================================
# Logged In Sidebar
# ====================================================

st.sidebar.success(

    f"Welcome, {st.session_state.username}"

)

if st.sidebar.button("Logout"):

    st.session_state.logged_in = False

    st.session_state.username = ""

    st.session_state.store = None

    st.rerun()

st.sidebar.divider()

# ====================================================
# Navigation
# ====================================================

menu = st.sidebar.selectbox(

    "Choose Feature",

    [

        "🏠 Dashboard",

        "📝 Notes",

        "🃏 Flashcards",

        "❓ MCQs",

        "📑 Revision",

        "🗺️ Mind Map",

        "📝 Quiz",

        "🤖 AI Tutor",

        "📅 Study Planner",

        "🎤 Interview",

        "🎯 Exam Predictor"

    ]

)

st.sidebar.divider()
# ==========================================================
# PDF Upload & Vector Store
# ==========================================================

st.header("📂 Upload Study Material")

uploaded_files = st.file_uploader(
    "Upload one or more PDF files",
    type=["pdf"],
    accept_multiple_files=True
)

if uploaded_files:

    all_chunks = []

    with st.spinner("Processing PDFs..."):

        for pdf in uploaded_files:

            path = save_uploaded_file(pdf)

            text = extract_text(path)

            if text.strip():

                chunks = create_chunks(text)

                all_chunks.extend(chunks)

    if all_chunks:

        store = VectorStore()

        store.build(all_chunks)

        st.session_state.store = store

        st.success(
            f"✅ {len(uploaded_files)} PDF(s) processed successfully!"
        )

if st.session_state.store is None:

    st.warning("📄 Please upload at least one PDF.")

    st.stop()

store = st.session_state.store

# ==========================================================
# Uploaded PDFs
# ==========================================================

if uploaded_files:

    with st.expander("📂 Uploaded PDFs", expanded=False):

        for pdf in uploaded_files:

            st.write("📄", pdf.name)

# ==========================================================
# Dashboard
# ==========================================================

if menu == "🏠 Dashboard":

    st.header("📊 Dashboard")

    stats = get_statistics()

    pdf_count = len(uploaded_files) if uploaded_files else 0

    c1, c2, c3 = st.columns(3)

    with c1:
        dashboard_card("PDFs", pdf_count, "📂")

    with c2:
        dashboard_card("Notes", stats["Notes"], "📝")

    with c3:
        dashboard_card("Flashcards", stats["Flashcards"], "🃏")

    c4, c5, c6 = st.columns(3)

    with c4:
        dashboard_card("MCQs", stats["MCQs"], "❓")

    with c5:
        dashboard_card("Revision", stats["Revision"], "📑")

    with c6:
        dashboard_card("Mind Maps", stats["Mind Map"], "🗺️")

    c7, c8, c9 = st.columns(3)

    with c7:
        dashboard_card("Quiz", stats["Quiz"], "📝")

    with c8:
        dashboard_card("Planner", stats["Study Planner"], "📅")

    with c9:
        dashboard_card("Interview", stats["Interview"], "🎤")

    st.markdown("---")

    # Center Exam Predictor card
    col1, col2, col3 = st.columns(3)

    with col2:
        dashboard_card(
            "Exam Predictor",
            stats["Exam Predictor"],
            "🎯"
        )

    st.markdown("---")
    df = pd.DataFrame({

        "Feature": [

            "Notes",
            "Flashcards",
            "MCQs",
            "Revision",
            "Mind Maps",
            "Quiz",
            "Planner",
            "Interview",
            "Exam Predictor"

        ],

        "Count": [

            stats["Notes"],
            stats["Flashcards"],
            stats["MCQs"],
            stats["Revision"],
            stats["Mind Map"],
            stats["Quiz"],
            stats["Study Planner"],
            stats["Interview"],
            stats["Exam Predictor"]

        ]

    })

    fig = px.bar(

        df,

        x="Feature",

        y="Count",

        title="Study Material Generated"

    )

    st.plotly_chart(
    fig,
    use_container_width=True,
    theme="streamlit"
)

    pie = px.pie(

        df,

        names="Feature",

        values="Count",

        title="Feature Usage"

    )

    st.plotly_chart(
    pie,
    use_container_width=True,
    theme="streamlit"
)

    score = (

        stats["Notes"] * 5 +

        stats["Flashcards"] * 4 +

        stats["MCQs"] * 4 +

        stats["Revision"] * 3 +

        stats["Quiz"] * 5 +

        stats["Interview"] * 5

    )
st.markdown("---")

st.subheader("💡 Daily Motivation")

quotes = [
    "📚 Success is the sum of small efforts, repeated every day.",
    "🚀 Every page you study today is a step toward your dream career.",
    "🎯 Stay consistent. Small progress is still progress.",
    "💪 Don't stop when you're tired. Stop when you're done.",
    "🌟 Believe in yourself. You are capable of amazing things.",
    "🧠 Learning never exhausts the mind—it only strengthens it.",
    "🔥 Your future self will thank you for studying today.",
    "🏅 Great achievements begin with disciplined habits."
]

import random

st.info(random.choice(quotes))

st.markdown(
    """
### 📖 Study Tip of the Day

- ✅ Focus on one topic at a time.
- ✅ Revise within 24 hours.
- ✅ Practice questions after every chapter.
- ✅ Study for 50 minutes, then take a 10-minute break.
- ✅ Consistency beats last-minute cramming.
"""
)
   # ==========================================================
# AI NOTES GENERATOR
# ==========================================================

if menu == "📝 Notes":

    st.header("📝 AI Notes Generator")

    st.write(
        "Generate detailed notes from your uploaded PDFs."
    )

    topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Operating System"
    )

    notes_type = st.selectbox(
        "Notes Style",
        [
            "Short Notes",
            "Detailed Notes",
            "Exam Notes"
        ]
    )

    if st.button(
        "Generate Notes",
        use_container_width=True
    ):

        if topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating Notes..."):

                    retrieved_chunks = store.retrieve(topic)

                    notes = generate_notes(
                        topic,
                        retrieved_chunks
                    )

                save_history(
                    topic,
                    "Notes",
                    notes
                )

                st.success("Notes Generated Successfully")

                st.markdown("---")

                st.markdown(notes)

                export_pdf(
                    "outputs/notes.pdf",
                    f"{notes_type}",
                    notes
                )

                export_docx(
                    "outputs/notes.docx",
                    f"{notes_type}",
                    notes
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/notes.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            "📄 Download PDF",
                            pdf,
                            file_name="Notes.pdf",
                            mime="application/pdf",
                            use_container_width=True
                        )

                with col2:

                    with open(
                        "outputs/notes.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            "📝 Download DOCX",
                            doc,
                            file_name="Notes.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            use_container_width=True
                        )

            except Exception as e:

                st.error(f"Error : {e}")
# ==========================================================
# AI FLASHCARD GENERATOR
# ==========================================================

if menu == "🃏 Flashcards":

    st.header("🃏 AI Flashcards Generator")

    st.write(
        "Generate interactive flashcards from your uploaded PDFs."
    )

    topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Operating System",
        key="flashcard_topic"
    )

    number_of_cards = st.slider(
        "Number of Flashcards",
        min_value=5,
        max_value=20,
        value=10,
        step=1
    )

    if st.button(
        "Generate Flashcards",
        use_container_width=True,
        key="generate_flashcards"
    ):

        if topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating Flashcards..."):

                    retrieved_chunks = store.retrieve(topic)

                    flashcards = generate_flashcards(
                        topic,
                        retrieved_chunks
                    )

                save_history(
                    topic,
                    "Flashcards",
                    flashcards
                )

                st.success("Flashcards Generated Successfully!")

                st.divider()

                st.subheader("📚 Your Flashcards")

                cards = [
                    card.strip()
                    for card in flashcards.split("\n\n")
                    if card.strip()
                ]

                for index, card in enumerate(cards[:number_of_cards], start=1):

                    with st.expander(
                        f"🃏 Flashcard {index}",
                        expanded=False
                    ):

                        st.markdown(card)

                export_pdf(
                    "outputs/flashcards.pdf",
                    "Flashcards",
                    flashcards
                )

                export_docx(
                    "outputs/flashcards.docx",
                    "Flashcards",
                    flashcards
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/flashcards.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            "📄 Download PDF",
                            pdf,
                            file_name="Flashcards.pdf",
                            mime="application/pdf",
                            use_container_width=True,
                            key="flashcards_pdf"
                        )

                with col2:

                    with open(
                        "outputs/flashcards.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            "📝 Download DOCX",
                            doc,
                            file_name="Flashcards.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            use_container_width=True,
                            key="flashcards_docx"
                        )

            except Exception as e:

                st.error(f"Error: {e}")
# ==========================================================
# AI MCQ GENERATOR
# ==========================================================

if menu == "❓ MCQs":

    st.header("❓ AI MCQ Generator")

    st.write(
        "Generate Multiple Choice Questions from your uploaded PDFs."
    )

    mcq_topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Deadlock",
        key="mcq_topic"
    )

    difficulty = st.selectbox(
        "Difficulty Level",
        [
            "Easy",
            "Medium",
            "Hard"
        ],
        key="mcq_difficulty"
    )

    if st.button(
        "Generate MCQs",
        use_container_width=True,
        key="generate_mcqs"
    ):

        if mcq_topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating MCQs..."):

                    retrieved_chunks = store.retrieve(mcq_topic)

                    mcqs = generate_mcqs(
                        mcq_topic,
                        retrieved_chunks
                    )

                save_history(
                    mcq_topic,
                    "MCQs",
                    mcqs
                )

                st.success("MCQs Generated Successfully!")

                st.divider()

                st.subheader("📚 Generated Questions")

                st.markdown(mcqs)

                export_pdf(
                    "outputs/mcqs.pdf",
                    "MCQs",
                    mcqs
                )

                export_docx(
                    "outputs/mcqs.docx",
                    "MCQs",
                    mcqs
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/mcqs.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            "📄 Download PDF",
                            pdf,
                            file_name="MCQs.pdf",
                            mime="application/pdf",
                            use_container_width=True,
                            key="mcq_pdf"
                        )

                with col2:

                    with open(
                        "outputs/mcqs.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            "📝 Download DOCX",
                            doc,
                            file_name="MCQs.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            use_container_width=True,
                            key="mcq_docx"
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")
# ==========================================================
# AI REVISION SHEET GENERATOR
# ==========================================================

if menu == "📑 Revision":

    st.header("📑 AI Revision Sheet Generator")

    st.write(
        "Generate a concise revision sheet from your uploaded study material."
    )

    revision_topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Operating System",
        key="revision_topic"
    )

    revision_type = st.selectbox(
        "Revision Format",
        [
            "Quick Revision",
            "Exam Revision",
            "One Page Summary"
        ],
        key="revision_type"
    )

    if st.button(
        "Generate Revision Sheet",
        use_container_width=True,
        key="generate_revision"
    ):

        if revision_topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating Revision Sheet..."):

                    retrieved_chunks = store.retrieve(
                        revision_topic
                    )

                    revision = generate_revision_sheet(
                        revision_topic,
                        retrieved_chunks
                    )

                save_history(
                    revision_topic,
                    "Revision",
                    revision
                )

                st.success(
                    "Revision Sheet Generated Successfully!"
                )

                st.divider()

                st.subheader("📚 Revision Sheet")

                st.markdown(revision)

                export_pdf(
                    "outputs/revision_sheet.pdf",
                    revision_type,
                    revision
                )

                export_docx(
                    "outputs/revision_sheet.docx",
                    revision_type,
                    revision
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/revision_sheet.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            label="📄 Download PDF",
                            data=pdf,
                            file_name="RevisionSheet.pdf",
                            mime="application/pdf",
                            use_container_width=True,
                            key="revision_pdf"
                        )

                with col2:

                    with open(
                        "outputs/revision_sheet.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            label="📝 Download DOCX",
                            data=doc,
                            file_name="RevisionSheet.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            use_container_width=True,
                            key="revision_docx"
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")
# ==========================================================
# AI MIND MAP GENERATOR
# ==========================================================

if menu == "🗺️ Mind Map":

    st.header("🗺️ AI Mind Map Generator")

    st.write(
        "Generate a structured mind map from your uploaded PDFs."
    )

    mindmap_topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Machine Learning",
        key="mindmap_topic"
    )

    mindmap_style = st.selectbox(
        "Mind Map Style",
        [
            "Hierarchical",
            "Tree Structure",
            "Concept Map"
        ],
        key="mindmap_style"
    )

    if st.button(
        "Generate Mind Map",
        key="generate_mindmap",
        use_container_width=True
    ):

        if mindmap_topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating Mind Map..."):

                    retrieved_chunks = store.retrieve(
                        mindmap_topic
                    )

                    mindmap = generate_mindmap(
                        mindmap_topic,
                        retrieved_chunks
                    )

                save_history(
                    mindmap_topic,
                    "Mind Map",
                    mindmap
                )

                st.success("Mind Map Generated Successfully!")

                st.divider()

                st.subheader("🧠 Generated Mind Map")

                st.code(
                    mindmap,
                    language="text"
                )

                export_pdf(
                    "outputs/mindmap.pdf",
                    "Mind Map",
                    mindmap
                )

                export_docx(
                    "outputs/mindmap.docx",
                    "Mind Map",
                    mindmap
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/mindmap.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            label="📄 Download PDF",
                            data=pdf,
                            file_name="MindMap.pdf",
                            mime="application/pdf",
                            key="mindmap_pdf",
                            use_container_width=True
                        )

                with col2:

                    with open(
                        "outputs/mindmap.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            label="📝 Download DOCX",
                            data=doc,
                            file_name="MindMap.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            key="mindmap_docx",
                            use_container_width=True
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")
# ==========================================================
# AI QUIZ GENERATOR
# ==========================================================

if menu == "📝 Quiz":

    st.header("📝 AI Quiz Generator")

    st.write(
        "Generate a quiz from your uploaded PDFs and test your knowledge."
    )

    quiz_topic = st.text_input(
        "Enter Topic",
        placeholder="Example: Operating System",
        key="quiz_topic"
    )

    num_questions = st.slider(
        "Number of Questions",
        min_value=5,
        max_value=20,
        value=10,
        step=1,
        key="quiz_count"
    )

    if st.button(
        "Generate Quiz",
        key="generate_quiz",
        use_container_width=True
    ):

        if quiz_topic.strip() == "":

            st.warning("Please enter a topic.")

        else:

            try:

                with st.spinner("Generating Quiz..."):

                    retrieved_chunks = store.retrieve(
                        quiz_topic
                    )

                    quiz = generate_quiz(
                        quiz_topic,
                        retrieved_chunks
                    )

                save_history(
                    quiz_topic,
                    "Quiz",
                    quiz
                )

                st.success("Quiz Generated Successfully!")

                st.divider()

                st.subheader("📝 Quiz")

                st.markdown(quiz)

                export_pdf(
                    "outputs/quiz.pdf",
                    "Quiz",
                    quiz
                )

                export_docx(
                    "outputs/quiz.docx",
                    "Quiz",
                    quiz
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/quiz.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            "📄 Download PDF",
                            data=pdf,
                            file_name="Quiz.pdf",
                            mime="application/pdf",
                            key="quiz_pdf",
                            use_container_width=True
                        )

                with col2:

                    with open(
                        "outputs/quiz.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            "📝 Download DOCX",
                            data=doc,
                            file_name="Quiz.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            key="quiz_docx",
                            use_container_width=True
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")
# ==========================================================
# AI TUTOR (CHAT WITH PDF)
# ==========================================================

if menu == "🤖 AI Tutor":

    st.header("🤖 AI Tutor")

    st.write(
        "Ask questions about your uploaded PDFs and get AI-powered answers."
    )

    user_question = st.text_input(
        "Ask a Question",
        placeholder="Example: Explain Deadlock",
        key="chat_question"
    )

    if st.button(
        "Ask AI",
        key="chat_button",
        use_container_width=True
    ):

        if user_question.strip() == "":

            st.warning("Please enter a question.")

        else:

            try:

                with st.spinner("Searching your study material..."):

                    retrieved_chunks = store.retrieve(
                        user_question
                    )

                    answer = chat_with_pdf(
                        user_question,
                        retrieved_chunks
                    )

                save_history(
                    user_question,
                    "AI Tutor",
                    answer
                )

                st.success("Answer Generated Successfully!")

                st.divider()

                st.subheader("💡 AI Answer")

                st.markdown(answer)

            except Exception as e:

                st.error(f"❌ Error: {e}")

    st.divider()

    with st.expander("💬 Example Questions"):

        st.markdown("""
- Explain Deadlock.
- What is Process Scheduling?
- What is Machine Learning?
- Explain TCP/IP Model.
- What are the advantages of Python?
- Differentiate Stack and Queue.
- Explain Operating System Architecture.
""")
# ==========================================================
# AI STUDY PLANNER
# ==========================================================

if menu == "📅 Study Planner":

    st.header("📅 AI Study Planner")

    st.write(
        "Generate a personalized study plan based on your exam schedule."
    )

    subject = st.text_input(
        "Subject",
        placeholder="Example: Data Structures",
        key="planner_subject"
    )

    exam_date = st.date_input(
        "Exam Date",
        key="planner_exam_date"
    )

    study_hours = st.slider(
        "Study Hours Per Day",
        min_value=1,
        max_value=12,
        value=4,
        step=1,
        key="planner_hours"
    )

    difficulty = st.selectbox(
        "Difficulty Level",
        [
            "Easy",
            "Medium",
            "Hard"
        ],
        key="planner_difficulty"
    )

    if st.button(
        "Generate Study Plan",
        key="generate_study_plan",
        use_container_width=True
    ):

        if subject.strip() == "":

            st.warning("Please enter a subject.")

        else:

            try:

                with st.spinner("Creating your study plan..."):

                    plan = generate_study_plan(
                        subject,
                        exam_date,
                        study_hours,
                        difficulty
                    )

                save_history(
                    subject,
                    "Study Planner",
                    plan
                )

                st.success("Study Plan Generated Successfully!")

                st.divider()

                st.subheader("📚 Your Study Plan")

                st.markdown(plan)

                export_pdf(
                    "outputs/study_plan.pdf",
                    "Study Plan",
                    plan
                )

                export_docx(
                    "outputs/study_plan.docx",
                    "Study Plan",
                    plan
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/study_plan.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            label="📄 Download PDF",
                            data=pdf,
                            file_name="StudyPlan.pdf",
                            mime="application/pdf",
                            key="studyplan_pdf",
                            use_container_width=True
                        )

                with col2:

                    with open(
                        "outputs/study_plan.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            label="📝 Download DOCX",
                            data=doc,
                            file_name="StudyPlan.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            key="studyplan_docx",
                            use_container_width=True
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")
# ==========================================================
# AI INTERVIEW PREPARATION
# ==========================================================

if menu == "🎤 Interview":

    st.header("🎤 AI Interview Preparation")

    st.write(
        "Generate interview questions from your uploaded study material and evaluate your answers."
    )

    topic = st.text_input(
        "Interview Topic",
        placeholder="Example: Machine Learning",
        key="interview_topic"
    )

    if st.button(
        "Generate Interview Questions",
        key="generate_interview",
        use_container_width=True
    ):

        if topic.strip() == "":

            st.warning("Please enter an interview topic.")

        else:

            try:

                with st.spinner("Generating Interview Questions..."):

                    retrieved_chunks = store.retrieve(topic)

                    questions = generate_interview_questions(
                        topic,
                        retrieved_chunks
                    )

                st.session_state["interview_questions"] = questions

                save_history(
                    topic,
                    "Interview",
                    questions
                )

                st.success("Interview Questions Generated!")

            except Exception as e:

                st.error(f"❌ Error: {e}")

    if "interview_questions" in st.session_state:

        st.divider()

        st.subheader("📋 Interview Questions")

        st.markdown(
            st.session_state["interview_questions"]
        )

        export_pdf(
            "outputs/interview_questions.pdf",
            "Interview Questions",
            st.session_state["interview_questions"]
        )

        export_docx(
            "outputs/interview_questions.docx",
            "Interview Questions",
            st.session_state["interview_questions"]
        )

        col1, col2 = st.columns(2)

        with col1:

            with open(
                "outputs/interview_questions.pdf",
                "rb"
            ) as pdf:

                st.download_button(
                    "📄 Download PDF",
                    pdf,
                    file_name="InterviewQuestions.pdf",
                    mime="application/pdf",
                    key="interview_pdf",
                    use_container_width=True
                )

        with col2:

            with open(
                "outputs/interview_questions.docx",
                "rb"
            ) as doc:

                st.download_button(
                    "📝 Download DOCX",
                    doc,
                    file_name="InterviewQuestions.docx",
                    mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    key="interview_docx",
                    use_container_width=True
                )

        st.divider()

        st.subheader("🗣️ Practice Your Answer")

        selected_question = st.text_area(
            "Question",
            height=120,
            key="selected_question"
        )

        user_answer = st.text_area(
            "Your Answer",
            height=200,
            key="user_answer"
        )

        if st.button(
            "Evaluate Answer",
            key="evaluate_answer",
            use_container_width=True
        ):

            if selected_question.strip() == "" or user_answer.strip() == "":

                st.warning(
                    "Please enter both the question and your answer."
                )

            else:

                try:

                    with st.spinner("Evaluating your answer..."):

                        feedback = evaluate_answer(
                            selected_question,
                            user_answer
                        )

                    st.success("Evaluation Completed!")

                    st.subheader("✅ AI Feedback")

                    st.markdown(feedback)

                    save_history(
                        selected_question,
                        "Interview Feedback",
                        feedback
                    )

                except Exception as e:

                    st.error(f"❌ Error: {e}")
# ==========================================================
# AI EXAM PREDICTOR
# ==========================================================

if menu == "🎯 Exam Predictor":

    st.header("🎯 AI Exam Predictor")

    st.write(
        "Predict important exam topics and likely questions from your uploaded study material."
    )

    exam_subject = st.text_input(
        "Subject / Topic",
        placeholder="Example: Database Management System",
        key="exam_subject"
    )

    exam_type = st.selectbox(
        "Exam Type",
        [
            "University Exam",
            "Mid Semester",
            "End Semester",
            "Competitive Exam"
        ],
        key="exam_type"
    )

    if st.button(
        "Predict Exam Questions",
        key="predict_exam_button",
        use_container_width=True
    ):

        if exam_subject.strip() == "":

            st.warning("Please enter a subject or topic.")

        else:

            try:

                with st.spinner("Analyzing study material..."):

                    retrieved_chunks = store.retrieve(
                        exam_subject
                    )

                    prediction = predict_exam(
                        exam_subject,
                        retrieved_chunks
                    )

                save_history(
                    exam_subject,
                    "Exam Predictor",
                    prediction
                )

                st.success("Prediction Generated Successfully!")

                st.divider()

                st.subheader("📚 Predicted Important Topics")

                st.markdown(prediction)

                export_pdf(
                    "outputs/exam_prediction.pdf",
                    "Exam Prediction",
                    prediction
                )

                export_docx(
                    "outputs/exam_prediction.docx",
                    "Exam Prediction",
                    prediction
                )

                col1, col2 = st.columns(2)

                with col1:

                    with open(
                        "outputs/exam_prediction.pdf",
                        "rb"
                    ) as pdf:

                        st.download_button(
                            label="📄 Download PDF",
                            data=pdf,
                            file_name="ExamPrediction.pdf",
                            mime="application/pdf",
                            key="exam_pdf",
                            use_container_width=True
                        )

                with col2:

                    with open(
                        "outputs/exam_prediction.docx",
                        "rb"
                    ) as doc:

                        st.download_button(
                            label="📝 Download DOCX",
                            data=doc,
                            file_name="ExamPrediction.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            key="exam_docx",
                            use_container_width=True
                        )

            except Exception as e:

                st.error(f"❌ Error: {e}")

    st.divider()

    with st.expander("💡 Tips for Better Predictions"):

        st.markdown("""
- Upload complete lecture notes.
- Upload previous year question papers.
- Upload unit-wise PDFs.
- Use specific topics instead of very broad subjects.
- Combine multiple PDFs for better AI predictions.
""")
# ==========================================================
# ABOUT AI STUDYMATE
# ==========================================================

if menu == "ℹ️ About":

    st.header("ℹ️ About AI StudyMate")

    st.markdown("""
## 📚 AI StudyMate

AI StudyMate is an intelligent learning assistant that helps students study more effectively using Artificial Intelligence and Retrieval-Augmented Generation (RAG).

### 🚀 Features

- 📝 AI Notes Generator
- 🃏 Flashcards Generator
- ❓ MCQ Generator
- 📑 Revision Sheet Generator
- 🗺️ Mind Map Generator
- 📋 Quiz Generator
- 🤖 AI Tutor (Chat with PDF)
- 📅 AI Study Planner
- 🎤 AI Interview Preparation
- 🎯 AI Exam Predictor

---

### 🛠️ Technologies Used

- Python
- Streamlit
- Google Gemini API
- LangChain
- FAISS Vector Store
- Sentence Transformers
- PyPDF
- ReportLab
- python-docx
- SQLite

---

### 👩‍💻 Developer

Developed as an AI-powered educational assistant to help students learn smarter through interactive study tools.

Version: **2.0**
""")

    st.divider()

    st.success("🎉 Thank you for using AI StudyMate!")
st.divider()

st.caption(
    "© 2026 AI StudyMate | Built with ❤️ using Streamlit and Google Gemini"
)