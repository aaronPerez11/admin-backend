/**
 * Medicos
 * ruta: '/api/medico'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');
 const { crearMedico, getMedicos, actualizarMedico, borrarMedico} = require('../controllers/medicos');
 
 const router = Router();
 
 router.get( '/', getMedicos);
 
 router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El hospital ID debe ser válido').isMongoId(),
    validarCampos
 ]  
 , crearMedico);
 
 router.put( '/:id', [
    
 ]
 , actualizarMedico);
 
 router.delete('/:id', borrarMedico)
 
 module.exports = router;