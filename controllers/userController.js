// const userModel = require('../models/userModel')
// const bcrypt = require('bcrypt');


// //login callback
// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const user = await userModel.findOne({ email, password })
//         if (!user) {
//             return user.status(404).send('User Not Found')
//         }
//         res.status(200).json({
//             success: true,
//             user,
//         });
//     }
//     catch (error) {
//         res.status(400).json({ success: false, error })
//     }
// };


// //register callback
// const registerController = async (req, res) => {
//     try {
//         const newUser = new userModel(req.body)
//         await newUser.save()
//         res.status(201).json({
//             success: true,
//             newUser
//         })
//     }
//     catch (error) {
//         res.status(400).json({ success: false, error })
//     }
// }


// module.exports = { loginController, registerController };

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User Not Found');
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid Credentials');
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new userModel({ name, email, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

module.exports = { loginController, registerController };
