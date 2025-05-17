const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
exports.userRegister = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      res.status(400).json("user already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser, "user Created successfuly");
  } catch (error) {
    res.json(error);
  }
};

exports.userSignin = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("user not found!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json("incorrect password");
    }
    const token = jwt.sign({ userName, id: user._id }, process.env.secreatkey, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: { userName: user.userName, id: user._id },
      });
  } catch (error) {
    res.json(error);
  }
};
