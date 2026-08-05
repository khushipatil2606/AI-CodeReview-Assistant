from module.export import export_pdf
from module.export import export_docx

text = """
Operating System

Deadlock

Definition

Deadlock occurs when two or more processes wait forever.

Conditions

Mutual Exclusion

Hold and Wait

No Preemption

Circular Wait
"""

export_pdf(
    "notes.pdf",
    "Operating System Notes",
    text
)

export_docx(
    "notes.docx",
    "Operating System Notes",
    text
)

print("Files Generated Successfully")