const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middleware");
const registerSchema = require("../validators/auth-validation-schema");

router.route("/").get(authController.home);
router.route("/register").post(validate(registerSchema), authController.register);
router.route("/login").post(authController.login);

module.exports = router;
