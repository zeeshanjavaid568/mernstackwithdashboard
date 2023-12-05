const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("Hello World");
});

router.route("/register").get((req, res) => {
  res.status(200).send("Welcome to register page.");
});

module.exports = router;
