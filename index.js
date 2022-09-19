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
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/upload', require('./routes/uploads'));


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto '+ 3000);
});