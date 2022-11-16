const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String},
    password: {type:String},
    edad: {type:Number},
    direccion: {type:String},
    telefono: {type:Number},
    avatar: {type:String},
    carrito: [{type:Object}]

})
const  User = mongoose.model('User', userSchema)

module.exports = User