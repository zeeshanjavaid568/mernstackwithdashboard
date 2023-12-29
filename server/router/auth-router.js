const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth-validation-schema");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/register")
  .post(validate(registerSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
