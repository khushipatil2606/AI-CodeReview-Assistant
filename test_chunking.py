from module.chunking import create_chunks

text = """
Operating System is system software.

It manages CPU, Memory, Disk and Devices.

Deadlock occurs when processes wait forever.

Scheduling improves CPU utilization.
"""

chunks = create_chunks(text)

print("Total Chunks:", len(chunks))

for i, chunk in enumerate(chunks):
    print(f"\nChunk {i+1}")
    print(chunk)