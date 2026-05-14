const { db } = require('../database/db');

exports.submitFeedback = (req, res) => {
  const { tokenId, rating, comment } = req.body;
  
  db.run(
    'INSERT INTO feedback (token_id, rating, comment) VALUES (?, ?, ?)',
    [tokenId, rating, comment],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Feedback submitted' });
    }
  );
};
