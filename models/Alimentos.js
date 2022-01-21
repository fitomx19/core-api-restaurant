const mongoose = require('mongoose');

const AlimentosSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    tags:[String]
    ,
    url:{
        type:String,
        required: true,
        trim: true
    },
    calorias:{
        type:Number,
        required: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Alimentos', AlimentosSchema);