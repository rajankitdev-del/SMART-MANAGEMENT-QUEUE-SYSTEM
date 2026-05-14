const { db } = require('../database/db');

class QueueService {
  /**
   * Rule-based AI Wait Time Estimation
   */
  calculateWaitTime(queuePosition, priority, loadFactor = 1.0) {
    const avgServiceTime = 5; // minutes per person
    const priorityFactor = priority === 'high' ? 0.5 : 1.0;
    
    const estimatedTime = queuePosition * avgServiceTime * priorityFactor * loadFactor;
    
    return {
      minutes: Math.ceil(estimatedTime),
      explanation: `Estimated using current queue load of ${loadFactor.toFixed(1)}x and average service time of ${avgServiceTime}m per person.`
    };
  }

  /**
   * Simulate Queue Movement
   * This updates the token's position and wait time slightly every time it's called
   */
  async simulateMovement(tokenId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tokens WHERE id = ?', [tokenId], (err, token) => {
        if (err || !token || token.status !== 'waiting') return resolve(token);

        // Randomly decide if queue moved (80% chance)
        const moved = Math.random() > 0.2;
        if (moved && token.queue_position > 0) {
          const newPosition = token.queue_position - 1;
          const newStatus = newPosition === 0 ? 'serving' : 'waiting';
          const newWaitTime = this.calculateWaitTime(newPosition, token.priority).minutes;
          
          db.run(
            'UPDATE tokens SET queue_position = ?, estimated_wait_time = ?, status = ?, called_at = ? WHERE id = ?',
            [newPosition, newWaitTime, newStatus, newStatus === 'serving' ? new Date().toISOString() : null, tokenId],
            (err) => {
              if (err) return reject(err);
              db.get('SELECT * FROM tokens WHERE id = ?', [tokenId], (err, updatedToken) => {
                resolve(updatedToken);
              });
            }
          );
        } else {
          resolve(token);
        }
      });
    });
  }

  /**
   * Generate Simulated Notifications
   */
  getNotifications(token) {
    const notifications = [
      { title: 'Token Generated', message: `Your token ${token.token_number} is now active.`, type: 'success', time: 'Just now' }
    ];

    if (token.queue_position <= 3 && token.queue_position > 0) {
      notifications.push({ title: 'Approaching Turn', message: 'You are almost there! Please stay near the counters.', type: 'alert', time: '1 min ago' });
    }

    if (token.status === 'serving') {
      notifications.push({ title: 'Now Serving', message: `Please proceed to Counter ${token.counter_number || 1}.`, type: 'alert', time: 'Now' });
    }

    if (token.status === 'completed') {
      notifications.push({ title: 'Service Completed', message: 'Thank you for visiting. Please provide your feedback.', type: 'success', time: 'Just now' });
    }

    return notifications;
  }
}

module.exports = new QueueService();
