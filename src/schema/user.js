const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    email:{type:String, require:true},
    edad: {type:Number, require:true},
    direccion: {type:String, require:true},
    telefono: {type:Number, require:true},
    avatar: {type:String, require:true},
    ordenes_compra: {type:Object, default: []}
},{timestamps:true})
const  Users = model('Users', userSchema)

module.exports = {Users, userSchema}