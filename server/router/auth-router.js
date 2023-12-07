const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth-validation-schema");

router.route("/").get(authController.home);
router.route("/register").post(validate(registerSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);

module.exports = router;
