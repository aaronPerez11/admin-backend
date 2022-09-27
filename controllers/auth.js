const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email invalido'
            });
        }

        //verificar contraseña
        const validaPassword = bcrypt.compareSync( password, usuarioDB.password);
        if(!validaPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar TOKEN
        const token =  await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role)
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const loginGoogle = async( req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify( req.body.token )

        const usuarioDB = await 
        Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar TOKEN
        const token =  await generarJWT( usuario.id );

         res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd( usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }

}

const renewToken = async(req, res = response) => {
    
    const uid = req.uid;
    
    try {

         //Generar TOKEN
    const token =  await generarJWT( uid );

    //Obtener usuario por ID
    const usuario = await Usuario.findById( uid );
    
    return res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role)
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}