const mongoose = require('mongoose')
const {baseDatos} = require('../../config')
async function connection (){
    const URIString = baseDatos;
    await mongoose.connect(baseDatos,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}


module.exports = connection