const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizaImagen } = require('../helpers/actualizarImagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es medico, usuario u hospital'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
      }

    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1];

    //Validar extension
    const extensionesValida = ['png','jpg','jpeg','gif'];
    if( !extensionesValida.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;
    
    //Mover imagen
    file.mv(path, (err)  => {
      if (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
        });
      }

    // Actualizar base de datos
    actualizaImagen(tipo, id, nombreArchivo);
    

      res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
        });

    });
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    if( fs.existsSync( pathImg) ){
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join(__dirname, `../uploads/defecto.png`);
        res.sendFile( pathImg );
    }

    
}

module.exports = {
    fileUpload,
    retornaImagen
}