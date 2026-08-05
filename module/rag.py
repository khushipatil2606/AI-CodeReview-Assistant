import faiss
import numpy as np

from module.embedings import create_embeddings


class VectorStore:

    def __init__(self):

        self.index = None

        self.chunks = []

    def build(self, chunks):

        self.chunks = chunks

        embeddings = create_embeddings(chunks)

        embeddings = np.array(
            embeddings,
            dtype="float32"
        )

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dimension)

        self.index.add(embeddings)

    def retrieve(self, question, top_k=5):

        question_embedding = create_embeddings(
            [question]
        )

        question_embedding = np.array(
            question_embedding,
            dtype="float32"
        )

        distance, indices = self.index.search(
            question_embedding,
            top_k
        )

        retrieved_chunks = []

        for i in indices[0]:

            retrieved_chunks.append(
                self.chunks[i]
            )

        return retrieved_chunks