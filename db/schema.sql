CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  due_date TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT CHECK(status IN ('Todo', 'In-Progress', 'Complete')) NOT NULL DEFAULT 'Todo',
  is_archived INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
