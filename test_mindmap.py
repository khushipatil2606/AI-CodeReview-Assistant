from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.rag import VectorStore

from module.mindmap_generator import generate_mindmap

pdf_path = r"C:\Users\lenovo\OneDrive\Desktop\study pro\data\uploaded_pdfs\R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)

store = VectorStore()

store.build(chunks)

topic = "Deadlock"

retrieved_chunks = store.retrieve(topic)

mindmap = generate_mindmap(
    topic,
    retrieved_chunks
)

print(mindmap)