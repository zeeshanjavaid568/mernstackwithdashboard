const express = require("express");
const getAllServices = require("../controllers/admin-services-controller");
const router = express.Router();

router.route("/services").get(getAllServices);

module.exports = router;
