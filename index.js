const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const path = require('path');

require('dotenv').config();


const app = express();

//Configurar cors
app.use(cors());

//Carpeta publica
app.use( express.static('public'));

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

// Rutas de angular
app.get('*', (req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html'))
})


app.listen(process.env.PORT || 5000, () => {
    console.log('Servidor corriendo en puerto '+ 3000);
});