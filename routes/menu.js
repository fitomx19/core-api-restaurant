const express = require('express');
const router = express.Router();
const alimentosController =require('../controller/menuController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//crear proyectos
//api/proyectos
router.post("/add", 

[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],
alimentosController.crearPlatillo
);

router.get("/", alimentosController.obtenerPlatillos);






module.exports = router;