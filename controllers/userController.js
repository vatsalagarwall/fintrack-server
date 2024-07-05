const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');


//login callback
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
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send('User Not Found');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // If passwords match, return success message or token
        res.status(200).json({
            success: true,
            user,
        });

        // Optionally, you could create a JWT token here for authenticated sessions
        // const token = createToken(user); // Implement createToken function
        // res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success: true,
            newUser
        })
    }
    catch (error) {
        res.status(400).json({ success: false, error })
    }
}


module.exports = { loginController, registerController };