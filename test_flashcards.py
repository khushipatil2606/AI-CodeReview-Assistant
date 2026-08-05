from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.rag import VectorStore
from module.flashcard_generator import generate_flashcards

pdf_path = r"C:\Users\lenovo\OneDrive\Desktop\study pro\data\sample_notes\R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)

store = VectorStore()

store.build(chunks)

question = "Deadlock"

retrieved = store.retrieve(question)

flashcards = generate_flashcards(question, retrieved)

print(flashcards)