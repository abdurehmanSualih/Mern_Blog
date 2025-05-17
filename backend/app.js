const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const userRouter = require("./router/userRouter");

app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("server listening on prot 8000");
});
