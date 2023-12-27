const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log("🚀 ~ file: auth-middleware.js:6 ~ authMiddleware ~ token:", token)
  //TODO: console.log("🚀 ~ file: auth-middleware.js:6 ~ authMiddleware ~ token:", token)

  if (!token) {
    //TODO: If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  //TODO: Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  //  console.log(jwtToken);

  try {
    //TODO: Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // TODO: console.log(
    //   "🚀 ~ file: auth-middleware.js:22 ~ authMiddleware ~ isVerified:",
    //   isVerified
    // );

    //TODO: getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log("🚀 ~ file: auth-middleware.js:28 ~ userData ~ userData:", userData)

    req.user = userData;
    req.token = token;
    req.userID = user._id;

    //TODO: Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
