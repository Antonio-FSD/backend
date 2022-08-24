require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');

const categoryRouter = require('./routes/productosRouter');
const userRouter = require('./routes/userRouter');
const Router = require('./routes/categoryRouter');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/route', objectRouter);

const mongoose = require('./utils/dbConnection.js');

app.listen(process.env.PORT, () => {
    console.log('Arranca por la banda');
});