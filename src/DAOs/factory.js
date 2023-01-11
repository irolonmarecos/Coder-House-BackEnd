require('dotenv').config({path:'../../.env'})

const DATABASE_TYPE = process.env.DATABASE_TYPE
const ProductoMongo = require('./productos')
const MensajeMongo = require('./mensajes');
const CarritoMongo = require('./carrito')
const UsuarioMongo = require('./user')

let prodsDAO ;
let msjDAO;
let carritoDAO;
let userDAO;
class DAOsFactory {
    static productosDAO(){
        switch(DATABASE_TYPE){
            case "MONGO":
                prodsDAO = new ProductoMongo
                return prodsDAO
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
                return msjDAO
                break
            
            case "FIREBASE":
                //msjDAO = new MensajeMongo
                break
        }
    }
    static carritDAO (){
        switch (DATABASE_TYPE){
            case "MONGO":
                carritoDAO = new CarritoMongo
                return carritoDAO
                break
                
            case "FIREBASE":
                //carritoDAO = new CarritoMongo
                break
        }
    }
    static usuarioDAO (){
        switch (DATABASE_TYPE){
            case "MONGO":
                userDAO = new UsuarioMongo
                return userDAO
                break
                
            case "FIREBASE":
                //carritoDAO = new CarritoMongo
                break
        }
    }

}

//const prueba1 = DAOsFactory
// const prueba2 = prueba1.productosDAO()

module.exports = DAOsFactory
