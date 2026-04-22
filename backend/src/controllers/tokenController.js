// Generate a new token
const generateToken = (req, res) => {
  const { locationId, serviceType } = req.body;
  
  // Planned logic: QR Scan -> Identify Location -> Generate Token -> Store -> Return Data
  // Returning static mock data for now
  res.status(201).json({
    message: "Token generated successfully",
    data: {
      tokenNumber: 24,
      serviceType: serviceType,
      locationId: locationId,
      peopleAhead: 5,
      estimatedWait: 15
    }
  });
};

// Get Token by ID
const getTokenById = (req, res) => {
  const { id } = req.params;
  // Mock data response
  res.status(200).json({
    message: `Status for token ${id}`,
    data: {
      tokenId: id,
      status: "waiting",
      peopleAhead: 3,
      estimatedWait: 10
    }
  });
};

module.exports = {
  generateToken,
  getTokenById
};
