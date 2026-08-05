from module.database import *

create_database()

save_history(
    "Deadlock",
    "Notes",
    "Deadlock is..."
)

rows = get_history()

for row in rows:

    print(row)