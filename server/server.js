const express = require("express");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");

//this method used for get data from put method data from api 
app.use(express.json());
//router-middleware
app.use("/api/auth", router);


app.listen(PORT, () => {
  console.log(`server is running port namber ${PORT}`);
});