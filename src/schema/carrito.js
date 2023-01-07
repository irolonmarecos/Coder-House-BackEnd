const {Schema, model} = require('mongoose');


const carritoSchema = new Schema({
    id: {type: String, require:true},
    usuario: {type: String, require:true},
    fecha_hora: {type: String, require:true},
    email: {type: String, require:true},
    item: {type:Array, default: []},
    total_pagar:{type: Number, default: 0},
    direccion: {type: String, require:true},
},{timestamps:true})

const carrito = model('carrito', carritoSchema)

module.exports = {
    carrito,    
    carritoSchema
}
