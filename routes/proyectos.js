const express = require('express');
const router = express.Router();
const proyectosController =require('../controller/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//crear proyectos
//api/proyectos
router.post("/", 
auth,
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectosController.crearProyecto
);

router.get("/", auth, proyectosController.obtenerProyectos);

router.put('/:id',auth,
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],

proyectosController.actualizarProyectos
);


router.delete(
  "/:id",
  auth,

  proyectosController.eliminarProyecto
);

module.exports = router;