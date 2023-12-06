require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

//this method used for get data from put method data from api
app.use(express.json());
//router-middleware
app.use("/api/auth", router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running port namber ${PORT}`);
  });
});
