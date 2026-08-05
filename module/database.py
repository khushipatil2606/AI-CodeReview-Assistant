import sqlite3

DATABASE_NAME = "database/studymate.db"


def create_database():

    conn = sqlite3.connect(DATABASE_NAME)

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS history(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        topic TEXT,

        content_type TEXT,

        generated_content TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()

    conn.close()

def save_history(topic, content_type, generated_content):

    conn = sqlite3.connect(DATABASE_NAME)

    cursor = conn.cursor()

    cursor.execute("""

    INSERT INTO history

    (topic,content_type,generated_content)

    VALUES

    (?,?,?)

    """,(topic,content_type,generated_content))

    conn.commit()

    conn.close()
def get_history():

    conn = sqlite3.connect(DATABASE_NAME)

    cursor = conn.cursor()

    cursor.execute("""

    SELECT

    id,

    topic,

    content_type,

    created_at

    FROM history

    ORDER BY id DESC

    """)

    rows = cursor.fetchall()

    conn.close()

    return rows
def get_content(record_id):

    conn = sqlite3.connect(DATABASE_NAME)

    cursor = conn.cursor()

    cursor.execute("""

    SELECT generated_content

    FROM history

    WHERE id=?

    """,(record_id,))

    result = cursor.fetchone()

    conn.close()

    return result[0]
def delete_history(record_id):

    conn = sqlite3.connect(DATABASE_NAME)

    cursor = conn.cursor()

    cursor.execute("""

    DELETE FROM history

    WHERE id=?

    """,(record_id,))

    conn.commit()

    conn.close()
