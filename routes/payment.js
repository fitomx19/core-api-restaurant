const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
require("dotenv").config({ path: ".env" });
const { check } = require('express-validator');
const Stripe = require('stripe')
const cors = require('cors')
const Usuario = require('../models/Usuario');

//crear proyectos
//api/proyectos

const stripe = new Stripe(process.env.STRIPE)

router.post('/checkout',async(req, res) =>{
   try {
   let {amount,id,mail,idUser} = req.body
   console.log(req.body)

   let precio = amount;
   amount = amount*100
   
   const customer = await stripe.customers.create({
      description: mail,
    });
    
    let shipping = {
      'address[line1]': 'calle 1a',
      'address[line2]': '',
      'address[city]': 'mexico',
      'name':mail,
      'phone': ''
   }
   
   console.log(shipping)
   const payment =   await stripe.paymentIntents.create({
         amount,
         currency: "MXN",
         description: precio + " Creditos",
         payment_method: id,
         shipping, 
         receipt_email:mail,
         confirm:true

      });
      //agregar previo dinero del cliente
      let update = await Usuario.findByIdAndUpdate({ _id: idUser }, { $set : { creditos: precio }}, { new: true });
      res.send({message: 'Pago Completado'});
      
   } catch (error) {
     console.log(error)
     res.json({message:error.raw.message})  
   }
})


module.exports = router;