const express = require("express");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");

app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`server is running port namber ${PORT}`);
});
