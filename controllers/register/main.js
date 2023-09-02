import mongoose from "mongoose";
import User, { userSchema } from "../../models/user/main.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
    try {
        if (!req.body.fullname) {
            res.status(422).send({ message: 'Fullname is required' });
            return false;
        }

        if (!req.body.email) {
            res.status(422).send({ message: 'Email is required' });
            return false;
        }

        if (!req.body.password) {
            res.status(422).send({ message: 'Password is required' });
            return false;
        }

        const user = new User({
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
        });

        userSchema.path('email').validate(async (value) => {
            const emailCount = await mongoose.models.User.countDocuments({ email: value });
            return !emailCount;
        }, 'email already exists');

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) { res.status(422).send({ message: 'failed data parse handling' }); return false; }

            user.password = hash;
        });

        if (user.password) {
            user
                .save()
                .then((result) => {
                    const token = jwt.sign({
                        id: result._id,
                        email: result.email
                    }, process.env.SECRET);

                    res.status(201).send({ message: "User registered", token });
                })
                .catch((err) => {
                    if (err) {
                        const errors = [];
                        let errorString = "";

                        for (const key in err.errors) {
                            if (err.errors.hasOwnProperty(key)) {
                                errors.push(err.errors[key].message);
                                errorString += err.errors[key].message + '\n';
                            }
                        }

                        // console.log(err);
                        res.status(422).json({message: errorString}); return false;
                    }
                });
        }
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

export default registerUser;