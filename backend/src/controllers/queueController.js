// Get Queue Status
const getQueueStatus = (req, res) => {
  // Mock data response
  res.status(200).json({
    message: "Queue status retrieved",
    data: {
      activeTokens: 12,
      averageWaitTime: 14,
      currentlyServing: 5
    }
  });
};

// Get People Ahead for a specific location/service
const getPeopleAhead = (req, res) => {
  // Mock data response
  res.status(200).json({
    message: "People ahead retrieved",
    data: {
      peopleAhead: 7
    }
  });
};

module.exports = {
  getQueueStatus,
  getPeopleAhead
};
