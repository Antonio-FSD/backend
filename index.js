//Importamos dotenv
require('dotenv').config();
const cors = require('cors');

//Modulos y referencias
const express = require('express');
const path = require('path');

const productRouter = require('./routes/productosRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const multer = require('multer');

//Iniciamos app (express)
const app = express();

app.use(cors());

app.use(express.json());

//Rutas
app.use('/route', objectRouter);


//Importamos el .env
const mongoose = require('./utils/dbConnection.js');

//Arrancar el servidor
app.listen(process.env.PORT, () => {
    console.log('Arranca por la banda');
});