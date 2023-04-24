const userModel = require('../models/userModel')


// LOGIN CallBack
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email, password})
        if (! user) {
            return res.status(404).send("User Not Email")
        }
        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(400).json({success: false, error})
    }
}


// REGISTER CallBack
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await  newUser.save();
        res.status(201).json({
            success:true,
            newUser,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

// FORGOT-PASSWORD CallBack
const forgotPasswordController = async () => {}

module.exports = {
    loginController,
    registerController,
    forgotPasswordController
};
