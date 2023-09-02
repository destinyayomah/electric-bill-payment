import User from "../../models/user/main.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const login = async(req, res) => {
    try {
        if(!req.body.email){
            res.status(422).send({ message: 'Email is required' });
            return false;
        }

        if(!req.body.password){
            res.status(422).send({ message: 'Password is required' });
            return false;
        }

        User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) { res.status(404).send({ message: 'Invalid credential' }); return false; }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    const errors = [];
                    let errorString = "";

    
                    for (const key in err.errors) {
                        if (err.errors.hasOwnProperty(key)) {
                            errors.push(err.errors[key].message);
                            errorString += err.errors[key].message + '\n';
                        }
                    }
    
                    res.status(422).json({ message: errorString }); return false;
                }

                if (!result) { res.status(404).send({ message: 'Invalid credentials' }); return false; }

                const token = jwt.sign({
                    id: user._id,
                    username: user.username
                }, process.env.SECRET);

                res.status(200).send({ message: "Access Granted", token });
            });
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

                res.status(422).json({message: errorString}); return false;
            }
        });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

export default login;