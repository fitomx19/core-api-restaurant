const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const auth = require('../middleware/auth');

const { check} = require('express-validator');
//Crea un usuario

//api/usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe de ser minimo de 6 caracteres ")
      .isLength({ min: 6 })
      
  ],
  usuarioController.crearUsuario
);


router.put(
  "/perfil-completo", auth,
  [
    check("phone", "El número de telefono es obligatorio").isNumeric(),
    check("sex", "Agrega un sexo valido").not().isEmpty(),
    check("genre", "Agrega un genero valido").not().isEmpty(),
    check("obj", "Agrega un objetivo valido").not().isEmpty(),
    check("cm", "Agrega una estatura correcta ").not().isEmpty(),
    check("kg", "Agrega un peso correcto ").not().isEmpty(),     
  ],
  usuarioController.perfilcompleto
);


module.exports = router;