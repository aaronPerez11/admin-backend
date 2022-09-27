const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medico = await Medico.find()
                        .populate('usuario', 'nombre img')
                        .populate('hospital','nombre img');
    res.json({
        ok: true,
        medico
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear al medico'
        });
    }
}

const actualizarMedico = async( req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById( id );
        if(!medicoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el medico con el ID'
            });
        }

        const cambiosMedico = {
            ...req.body
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new: true});

        return res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById( id );
        if( !medico ){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        return res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id)
                            .populate('usuario', 'nombre img')
                            .populate('hospital','nombre img');
        res.json({
            ok: true,
            medico
        })
        
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Medico no encontrado'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}