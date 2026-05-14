const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

router.get('/status', (req, res) => {
  db.get('SELECT COUNT(*) as total FROM tokens WHERE status = "waiting"', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.json({
      currentServingToken: `B-${Math.floor(Math.random() * 100) + 1}`,
      totalWaitingUsers: row.total || 0,
      averageWaitTime: 12,
      nextToken: `B-${Math.floor(Math.random() * 900) + 100}`,
      queueLoadLevel: row.total > 20 ? 'High' : row.total > 10 ? 'Medium' : 'Low'
    });
  });
});

module.exports = router;
