const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    required: true,
  },
  perfil_completo:{
    type: Boolean,
    default: false
  },
  peso: {
    type: Number,
    trim: true
  },
  telefono: {
    type: Number,
    trim: true
  },
  altura:{
    type: Number,
    trim: true
  },
  sexo:{
    type: Number,
    trim: true
  },
  genero:{
    type: Number,
    trim: true
  },
  meta:{
    type:Number,
    trim: true
  },
  registro: {
      type: Date,
      default: Date.now()
  },
});

module.exports = mongoose.model('Usuario', UsuariosSchema);