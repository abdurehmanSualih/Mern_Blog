const express = require('express');

const router = express.Router();
const userConteroller = require('../controller/userController');

router.post("/register", userConteroller.userRegister);
router.post("/signin", userConteroller.userSignin);
module.exports = router;
