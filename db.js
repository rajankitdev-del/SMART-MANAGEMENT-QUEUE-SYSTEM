const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'queue_seva.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

const initDb = () => {
  db.serialize(() => {
    // Tokens Table
    db.run(`CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token_number TEXT NOT NULL,
      qr_code_value TEXT,
      service_type TEXT,
      source TEXT,
      priority TEXT DEFAULT 'normal',
      status TEXT DEFAULT 'waiting',
      queue_position INTEGER,
      estimated_wait_time INTEGER,
      current_serving_token TEXT,
      counter_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      called_at DATETIME,
      completed_at DATETIME
    )`);

    // Feedback Table
    db.run(`CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token_id INTEGER,
      rating INTEGER,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(token_id) REFERENCES tokens(id)
    )`);

    // Support Requests Table
    db.run(`CREATE TABLE IF NOT EXISTS support_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token_id INTEGER,
      issue_type TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(token_id) REFERENCES tokens(id)
    )`);
  });
};

module.exports = { db, initDb };
