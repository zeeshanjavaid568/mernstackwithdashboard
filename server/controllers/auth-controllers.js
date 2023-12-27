const User = require("../model/user-model");

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
      message: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

//========LOGIN-PAGE-FUNCTION===========

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ message: "Invalid Credentails" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

//===========Current-User-LoginIn-Data============

const user = async (req, res, next) => {
  try {
    const userData = req.user;
    console.log("🚀 ~ file: auth-controllers.js:60 ~ user ~ userData:", userData)
    return res.status(200).json({userData});
  } catch (error) {
    // next()
    res.status(500).json(console.log("current user Data function error", error));
  }
};

module.exports = { register, login, user };
