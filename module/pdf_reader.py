import os
from pypdf import PdfReader

from config import UPLOAD_DIR


def save_uploaded_file(uploaded_file):
    """
    Save uploaded PDF
    """

    file_path = os.path.join(
        UPLOAD_DIR,
        uploaded_file.name
    )

    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    return file_path


def extract_text(pdf_path):
    """
    Extract text from PDF
    """

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:
            text += extracted + "\n"

    return text