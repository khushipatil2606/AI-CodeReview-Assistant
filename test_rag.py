from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.embedings import create_embeddings
from module.rag import VectorStore

pdf_path = r"C:\Users\lenovo\OneDrive\Desktop\study pro\data\sample_notes\R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)

store = VectorStore()

store.build(chunks)

query = "What is Deadlock?"

query_embedding = create_embeddings([query])[0]

results = store.search(query_embedding)

for i, chunk in enumerate(results, 1):

    print(f"\nResult {i}\n")

    print(chunk)