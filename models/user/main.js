import mongoose from "mongoose";

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'fullname is required']
    },
    email: {
        type: String,
        required: [true, 'email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minLength: [6, 'password too short'],
        maxLength: [64, 'password too long'],
        required: [true, 'password is required']
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;