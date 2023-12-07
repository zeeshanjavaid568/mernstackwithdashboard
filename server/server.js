require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//this method used for get data from put method data from api
app.use(express.json());
//router-middleware
app.use("/api/auth", router);
//we must create error middleware above the server connection
app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running port namber ${PORT}`);
  });
});
