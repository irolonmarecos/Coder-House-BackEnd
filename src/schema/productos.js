const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    id: {type: String, require:true},
    nombre: {type: String, require:true},
    descripcion: {type: String, require:true},
    precio: {type: Number, require:true},
    stock: {type: Number, require:true},
    url: {type: String, require:true}
},{timestamps:true});

const producto = model ('producto', ProductSchema);

module.exports = {
    producto,    
    ProductSchema
}