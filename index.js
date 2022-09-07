require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');

const movieRouter = require('./routers/movieRouter');
const userRouter = require('./routers/userRouter');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', movieRouter);
app.use('/users', userRouter);

const mongoose = require('./utils/dbConnection.js');

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});