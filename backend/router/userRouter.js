const express = require('express');

const router = express.Router();
const userConteroller = require('../controller/userController');

router.post("/register", userConteroller.userRegister);
module.exports = router;
