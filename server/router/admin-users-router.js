const express = require("express");
const getAllUsers = require("../controllers/admin-users-controller");
const router = express.Router();

router.route("/users").get(getAllUsers);

module.exports = router;
