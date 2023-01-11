const {Schema, model} = require('mongoose');

const MensajeSchema = new Schema({
    email: {type: String},
    author:{
        nombre: {type: String, require:true},
        apellido: {type: String, require:true},
        edad: {type: Number},
        alias: {type: String, require:true},
        avatar: {type: String}
    },
    text: {type: String, require:true},

},{timestamps:true});

const mensaje = model ('mensaje', MensajeSchema);

module.exports = {
    mensaje,    
    MensajeSchema
}