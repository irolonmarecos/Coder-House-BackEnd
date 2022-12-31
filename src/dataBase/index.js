const mongoose = require('mongoose')
const {baseDatos} = require('../../config')
async function connection (){
    const URIString = baseDatos;
    await mongoose.connect('mongodb+srv://ignacio:pass123456@cluster0.cqnie57.mongodb.net/SEGUNDA_PREENTREGA',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB");
}


module.exports = connection