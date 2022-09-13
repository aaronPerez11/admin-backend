const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config();


const app = express();

//Configurar cors

app.use(cors());

//DB
dbConnection();

//mean_user | 4vJ5qZ4SWPwL0HIz

//Rutas
app.get( '/', (req, res) => {

    res.json({
        ok:true,
        msg: 'Hola mundo'
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto '+ 3000);
});