const Alimentos = require('../models/Alimentos');
const {validationResult} = require('express-validator');
const Planes = require('../models/Planes');

exports.crearPlatillo = async  (req,res) => {
    console.log(req.body);
    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    try {
        const consulta = new Alimentos(req.body);
        //Guardar el creador via JWT
        //consulta.creador = req.usuario.id;
        //guardar el proyecto
        console.log(consulta);
        
        consulta.save();
        res.json(consulta);

    } catch (error) {
        console.log('error');
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyextos del usuario actual

exports.obtenerPlatillos = async (req,res) =>{
    try {
        const platillos = await Alimentos.find();
        //res.json({proyectos})
        res.json(platillos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPlanes = async (req,res) =>{
    try {
        const platillos = await Planes.find();
        //res.json({proyectos})
        res.json(platillos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}