const express = require('express');
const { loginController, registerController, forgotPasswordController } = require('../controllers/userController');

//router object
const router = express.Router();

//routers
//POST || LOGIN
router.post('/login', loginController )

//POST || REGISTER
router.post('/register',registerController)

//POST || FORGOT PASSWORD
router.post('/forgot-password', forgotPasswordController)


module.exports = router