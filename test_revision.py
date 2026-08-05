from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.rag import VectorStore

from module.revision_generator import generate_revision_sheet

pdf_path = "data/sample_notes/R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)

store = VectorStore()

store.build(chunks)

topic = "Deadlock"

retrieved_chunks = store.retrieve(topic)

revision = generate_revision_sheet(
    topic,
    retrieved_chunks
)

print(revision)