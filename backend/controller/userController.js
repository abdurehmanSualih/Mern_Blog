const bcrypt = require("bcrypt");

const User = require("../model/userModel");
exports.userRegister = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existedUser = User.findOne(email);
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
