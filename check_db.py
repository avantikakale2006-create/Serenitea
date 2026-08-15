import sqlite3
import os

db_path = r'c:\Users\Admin\Serenitea\backend\stress_app.db'
if not os.path.exists(db_path):
    print(f"Error: Database not found at {db_path}")
else:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT id, user_id, date, score_percentage FROM assessments")
    rows = cur.fetchall()
    print("Assessments in DB:")
    for row in rows:
        print(row)
    conn.close()
