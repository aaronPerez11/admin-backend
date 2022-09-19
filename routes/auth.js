/*
Ruta: /api/login
*/
const { Router } = require('express');
const { login, loginGoogle } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', 
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post( '/google', 
    [
        check('token','El toke de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginGoogle
)


module.exports = router;