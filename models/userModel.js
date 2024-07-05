const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//schema design
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required and should be unique"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    // Check if the password field has been modified
    if (this.isModified('password')) {
        // Generate a salt with a cost factor of 10
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;