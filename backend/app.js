const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
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
app.use("/images", express.static(path.join(__dirname, "./images")));

const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");

app.use("/user", userRouter);
app.use("/post", postRouter);

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
