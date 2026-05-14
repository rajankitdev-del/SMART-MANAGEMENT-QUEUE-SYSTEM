const { db } = require('../database/db');

exports.createRequest = (req, res) => {
  const { tokenId, issueType, message } = req.body;
  
  db.run(
    'INSERT INTO support_requests (token_id, issue_type, message) VALUES (?, ?, ?)',
    [tokenId, issueType, message],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Support request created' });
    }
  );
};
