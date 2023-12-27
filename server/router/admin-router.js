const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.route("/users").get( adminController.getAllUsers);
router.route("/contacts").get(adminController.getAllContacts);
router.route("/services").get(adminController.getAllServices);

module.exports = router;
