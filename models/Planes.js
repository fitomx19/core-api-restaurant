const mongoose = require('mongoose');

const PlanesSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    precio:{
        type:Number,
        required: true,
        trim: true
    },
    alimentos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Alimentos'
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type:Number,
        required: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('planes', PlanesSchema);