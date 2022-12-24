require('dotenv').config()

const DATABASE_TYPE = process.env.DATABASE_TYPE
const ProductoMongo = require('./productos')
const MensajeMongo = require('./mensajes');
const { mongo } = require('mongoose');

let prodsDAO ;
let msjDAO;
class DAOsFactory {
    static productosDAO(){
        switch(DATABASE_TYPE){
            case "MONGO":
                prodsDAO = new ProductoMongo
                break
            case "FIREBASE":
                //prodsDAO = new ProductoFirebase
                //return prodsDAO
                break
        }
    }
    static mensajesDAO (){
        switch (DATABASE_TYPE){
            case "MONGO":
                msjDAO = new MensajeMongo
                break
            
            case "FIREBASE":
                //msjDAO = new MensajeMongo
                break
        }
    }
}

//const prueba1 = DAOsFactory
// const prueba2 = prueba1.productosDAO()

module.exports = DAOsFactory
