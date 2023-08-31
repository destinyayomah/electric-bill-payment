import User, { userSchema } from "../../models/user/main.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const validateUser = (req, res) => {
    try {
        User.findOne({ _id: req.params.uid }, (err, user) => {
            if (!user) { res.status(404).send({ message: "User not found" }); return false; }

            res.status(200).send({ message: "User found" });
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}

export const showAUserByToken = async (req, res) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) { res.status(404).send({ message: 'token required' }); return false; }

        if (!authorization.includes('Bearer ')) { res.status(404).send({ message: 'invalid token' }); return false; }

        const token = authorization.split('Bearer ')[1];

        const user = jwt.verify(token, process.env.SECRET);

        if (!user.id) { res.status(404).send({ message: 'invalid token' }); }

        User.findOne({ _id: user.id }, (err, user) => {
            if (err) {
                const errors = [];

                for (const key in err.errors) {
                    if (err.errors.hasOwnProperty(key)) {
                        errors.push(err.errors[key].message);
                    }
                }

                res.status(422).json({ errors }); return false;
            }

            if (!user) { res.status(404).send({ message: "User not found" }); return false; }

            res.status(200).send(user);
        });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
}
