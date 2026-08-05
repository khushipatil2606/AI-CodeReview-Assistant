from module.pdf_reader import extract_text
from module.chunking import create_chunks
from module.embedings import create_embeddings

pdf_path = r"C:\Users\lenovo\OneDrive\Desktop\study pro\data\sample_notes\R20CSE2202-OPERATING-SYSTEMS.pdf"

text = extract_text(pdf_path)

chunks = create_chunks(text)
    
embeddings = create_embeddings(chunks)

print("Total Chunks:", len(chunks))

print("Embedding Shape:")

print(embeddings.shape)