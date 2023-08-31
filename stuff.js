import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user/main.js';
import cors from 'cors';

import mongoose from './utils/connectDb.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send({ message: "Welcome to the Electric Bill Payment API" });
});

app
    .get('*', (req, res) => {
        res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
    })
    .post('*', (req, res) => { 
        res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
    })
    .patch('*', (req, res) => {
        res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
    })
    .delete('*', (req, res) => {
        res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
    });


app.listen(PORT, (err) => {
    if (err) { res.send(err); return false; }

    console.log(`Server running on port ${PORT}`);
});