const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config();


const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo de body
app.use(express.json());

//DB
dbConnection();

//mean_user | 4vJ5qZ4SWPwL0HIz

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto '+ 3000);
});