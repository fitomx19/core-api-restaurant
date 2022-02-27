const Usuario = require('../models/Usuario');
const bcrypyjs = require('bcryptjs');
const {validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async  (req,res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
  }
    //extraer email y password
    const { email,password } = req.body;
    console.log(req.body)

    try {
        //revisar que el usuario sea unico
          let usuario = await Usuario.findOne({ email });
          if(usuario){
            return res
              .status(400)
              .json({ msg: "El usuario ingreso un email repetido" });
          }
        
          usuario = new Usuario(req.body);

          //hash password
          const salt =  await bcrypyjs.genSalt(15);
          usuario.password = await bcrypyjs.hash(password, salt);
          
          //guardar el nuevo usuario
          await usuario.save();
          //creay y firmar token
          const payload = {
            usuario:{
              id: usuario.id
            }
          };
          jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600
          },(error,token)=>{
              if(error)
                         throw error;
                         //Mensaje de confirmacion
                         res.status(200).json({ token });
                       
          } );

          
        } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.perfilcompleto = async  (req,res) => {
  //revisar si hay errores

  
  const errores = validationResult(req);
  
    //extraer email y password
    const { phone,sex,genre,obj,cm,kg,_id } = req.body;
    //console.log(req.body)

    console.log(_id)
    let datosActualizados = {}
    if(req.body){
        datosActualizados.telefono = phone;
        datosActualizados.sexo = sex;
        datosActualizados.genero = genre;
        datosActualizados.meta = obj;
        datosActualizados.peso = kg;
        datosActualizados.altura = cm;
        datosActualizados.perfil_completo = true;

    }

    try {
        //revisar que el usuario sea unico
          console.log(_id)
          let usuario = await Usuario.findOne({ _id });
          if(usuario.perfilcompleto === true){
            return res
              .status(400)
              .json({ msg: "El perfil ya esta completado" });
          }
        
          try{
            usuario = await Usuario.findByIdAndUpdate({ _id: _id }, { $set : datosActualizados}, { new: true });
            //console.log(datosActualizados)
          }catch(err){
            console.log(err)
          }
          
          console.log(usuario);
          
          res.status(200).json( usuario );

          
        } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}



exports.direccionCompleta = async  (req,res) => {
  //revisar si hay errores

  
    console.log(req.body)
  
    //extraer email y password
    const {_id,cp,estado,ciudad,calle,pais } = req.body;
    //console.log(req.body)
    let datosActualizados = {}
    if(req.body){
      datosActualizados.pais = pais;
      datosActualizados.calle = calle;
      datosActualizados.ciudad = ciudad;
      datosActualizados.estado = estado;
      datosActualizados.cp = cp;
  }

    try {
        //revisar que el usuario sea unico
          let update = await Usuario.findByIdAndUpdate({ _id: _id }, { $set : datosActualizados}, { new: true });
          
          res.status(200).json( update );

          
        } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}