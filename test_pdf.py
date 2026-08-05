from module.pdf_reader import extract_text

pdf_path = r"C:\Users\lenovo\Desktop\study pro\data\sample_notes\R20CSE2202-OPERATING-SYSTEMS.pdf"
text = extract_text(pdf_path)

print(text[:3000])