const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

const userRouter = require("./router/userRouter");

app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log(`server listening on prot ${process.env.Port}`);
    });
  });
