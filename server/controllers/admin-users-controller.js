const User = require("../model/user-model");

const getAllUsers = async (req, res) => {
  try {
    //TODO: Using by the projection method inside the find method to neglect the field in database in below line
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No Users Found." });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllUsers;
