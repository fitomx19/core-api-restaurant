const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
require("dotenv").config({ path: ".env" });
const { check } = require('express-validator');
const Stripe = require('stripe')
const cors = require('cors')
//crear proyectos
//api/proyectos

const stripe = new Stripe(process.env.STRIPE)

router.post('/checkout',async(req, res) =>{
   try {
    const {amount,id} = req.body
    const payment =   await stripe.paymentIntents.create({
          amount,currency: "USD",description: "800 Creditos",payment_method: id,confirm:true
      })
      res.send({message: 'Success payment'});
   } catch (error) {
     console.log(error)
     res.json({message:error.raw.message})  
   }
})


module.exports = router;