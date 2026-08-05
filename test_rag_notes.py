from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.rag import VectorStore
from module.notes_generator import generate_notes

pdf_path = r"C:\Users\lenovo\OneDrive\Desktop\study pro\data\uploaded_pdfs\R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)

store = VectorStore()

store.build(chunks)

question = "Explain Deadlock"

retrieved = store.retrieve(question)

notes = generate_notes(
    question,
    retrieved
)

print(notes)