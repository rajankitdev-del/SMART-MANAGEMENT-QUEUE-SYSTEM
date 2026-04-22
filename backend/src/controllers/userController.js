// Placeholder for user login
const loginUser = (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    message: "User logged in successfully",
    user: { email }
  });
};

module.exports = {
  loginUser
};
