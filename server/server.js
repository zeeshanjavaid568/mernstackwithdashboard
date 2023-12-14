require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require('cors')
const authRoute = require("./router/auth-router");
const contactFormRoute = require("./router/contact-form-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};
app.use(cors(corsOption));
//this method used for get data from put method data from api
app.use(express.json());
//router-middleware
app.use("/api/auth", authRoute);
app.use("/api/form", contactFormRoute);
//we must create error middleware above the server connection
app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running port namber ${PORT}`);
  });
});
