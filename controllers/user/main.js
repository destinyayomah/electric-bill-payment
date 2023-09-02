import User from "../../models/user/main.js"; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const showAUser = async (req, res) => {
    try {
        const { authorization } = req.headers;npm 

        if (!authorization) { res.status(404).send({ message: 'unauthorized' }); return false; }

        if (!authorization.includes('Bearer ')) { res.status(404).send({ message: 'invalid token' }); return false; }

        const token = authorization.split('Bearer ')[1];

        const user = jwt.verify(token, process.env.SECRET);

        if (!user.id) { res.status(404).send({ message: 'invalid token' }); return false; }

        User.findOne({ _id: req.params.uid })
            .select('-password -__v')
            .then((user) => {
                if (!user) { res.status(404).send({ message: "User not found" }); return false; }

                res.status(200).send(user);
            }).catch((err) => {
                if (err) {
                    const errors = [];
                    let errorString = "";

                    for (const key in err.errors) {
                        if (err.errors.hasOwnProperty(key)) {
                            errors.push(err.errors[key].message);
                            errorString += err.errors[key].message + '\n';
                        }
                    }

                    if(errorString == '') errorString = "Error Encountered!";
                    res.status(422).json({ message: errorString }); return false;
                }
            });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
}