const User = require("../model/user-model");

//========HOME-PAGE-FUNCTION===========

const home = async (req, res) => {
  try {
    res.status(200).send("Home page.");
  } catch (error) {
    res.status(400).send({ message: "Page not found." });
  }
};

//========REGISTER-PAGE-FUNCTION===========

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email already exists." });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send({ message: "Page not found." });
  }
};

module.exports = { home, register };
