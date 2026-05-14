const { db } = require('../database/db');
const queueService = require('../services/queueService');

exports.createToken = (req, res) => {
  const { qrCodeValue, serviceType, source, priority } = req.body;
  
  // Simulate finding queue position
  const simulatedPosition = Math.floor(Math.random() * 15) + 5;
  const tokenNumber = `B-${Math.floor(Math.random() * 900) + 100}`;
  const waitTime = queueService.calculateWaitTime(simulatedPosition, priority).minutes;
  
  const query = `INSERT INTO tokens 
    (token_number, qr_code_value, service_type, source, priority, queue_position, estimated_wait_time, current_serving_token, counter_number) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const currentServing = `B-${Math.floor(Math.random() * 100) + 1}`;
  const counter = Math.floor(Math.random() * 5) + 1;

  db.run(query, [tokenNumber, qrCodeValue, serviceType, source, priority || 'normal', simulatedPosition, waitTime, currentServing, `Counter ${counter}`], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    res.status(201).json({
      id: this.lastID,
      tokenNumber,
      queuePosition: simulatedPosition,
      estimatedWaitTime: waitTime,
      status: 'waiting'
    });
  });
};

exports.getTokenDetails = async (req, res) => {
  const { tokenId } = req.params;
  
  // Apply simulation movement
  try {
    const token = await queueService.simulateMovement(tokenId);
    if (!token) return res.status(404).json({ error: 'Token not found' });
    res.json(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTokenStatus = async (req, res) => {
  const { tokenId } = req.params;
  
  try {
    const token = await queueService.simulateMovement(tokenId);
    if (!token) return res.status(404).json({ error: 'Token not found' });
    
    const progress = Math.max(0, Math.min(100, 100 - (token.queue_position * 5)));
    const waitInfo = queueService.calculateWaitTime(token.queue_position, token.priority);
    
    res.json({
      tokenNumber: token.token_number,
      status: token.status,
      queuePosition: token.queue_position,
      estimatedWaitTime: token.estimated_wait_time,
      waitExplanation: waitInfo.explanation,
      currentServingToken: token.current_serving_token,
      counterNumber: token.counter_number,
      progressPercentage: progress
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePriority = (req, res) => {
  const { tokenId } = req.params;
  const { priority } = req.body;
  
  db.get('SELECT * FROM tokens WHERE id = ?', [tokenId], (err, token) => {
    if (err || !token) return res.status(404).json({ error: 'Token not found' });
    
    const newPosition = Math.max(1, Math.floor(token.queue_position / 2));
    const newWaitTime = queueService.calculateWaitTime(newPosition, priority).minutes;
    
    db.run(
      'UPDATE tokens SET priority = ?, queue_position = ?, estimated_wait_time = ? WHERE id = ?',
      [priority, newPosition, newWaitTime, tokenId],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Priority updated', newPosition, newWaitTime });
      }
    );
  });
};

exports.confirmService = (req, res) => {
  const { tokenId } = req.params;
  
  db.run(
    'UPDATE tokens SET status = ?, completed_at = ? WHERE id = ?',
    ['completed', new Date().toISOString(), tokenId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Service confirmed as completed' });
    }
  );
};

exports.getTokenNotifications = (req, res) => {
  const { tokenId } = req.params;
  
  db.get('SELECT * FROM tokens WHERE id = ?', [tokenId], (err, token) => {
    if (err || !token) return res.status(404).json({ error: 'Token not found' });
    const notifications = queueService.getNotifications(token);
    res.json(notifications);
  });
};

exports.getTokenHistory = (req, res) => {
  db.all('SELECT * FROM tokens ORDER BY created_at DESC LIMIT 20', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
