const path = require('path')
const {producto} = require('../schema/productos')
const factory = require('../DAOs/factory')
const prodsDAO = factory.productosDAO()

const { loggerDev, loggerProd} =  require('../Utils/logger_config')
const { text } = require('body-parser')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

async function getAllProductos (req,res) {
    try{
        const listaProductos = await prodsDAO.getAll()
        res.send(listaProductos)
    }catch(err){
        logger.log("warn", `ERROR AL MOSTRAR EL CARRITO : ${err}`)
    }

}

async function postNvoProd (req,res){
    try{
        const nombre = req.body.nombre;
        const categoria = req.body.categoria;
        const precio = req.body.precio;
        const stock = req.body.stock;
        const url = req.body.url;
        const prod = new producto({nombre,categoria,precio,stock,url})
        const result = await prodsDAO.save(prod)
        logger.log("info", `Producto creado satisfactoriamente`)
        res.send(`El producto ${result}, se ha registrado satisfactoriamente`)
    }catch(err){
        logger.log("warn", `ERROR AL CREAR EL PRODUCTO: ${err}`)
    }
}

async function getProdId (req,res){
    try{
        const id = req.params.id
        const prod = await prodsDAO.getById(id)
        res.send(prod)
    }catch(err){
        logger.log("warn", `ERROR AL BUSCAR EL PRODUCTO: ${err}`)
    }
}

async function modificarProd (req,res){
    try{
        const id = req.params.id
        const prodID = {_id: id}
        const {
            nombre,
            descripcion,
            precio,
            stock,
            url
        } = req.body
        const prodActualizado = {
            nombre,
            descripcion,
            precio,
            stock,
            url
        } 
        const nuevoProducto = await prodsDAO.updateById(prodID,prodActualizado)
        res.send(prodActualizado)
    }catch(err){
        logger.log("warn", `ERROR AL MODIFICAR EL PRODUCTO: ${err}`)
    }
}

async function deleteProducto (req,res) {
    try{
        const id = req.params.id;
        const borrar = await prodsDAO.deleteById(id)
        res.send(borrar)
    }catch(err){
        logger.log("warn", `ERROR AL BORRAR EL PRODUCTO: ${err}`) 
    }
} 


async function getCategoria (req,res){
    try{
        const categoria = req.params.categoria
        const prod = await prodsDAO.getByCategoria(categoria)
        console.log(prod);
        res.send(prod)
    }catch(err){
        logger.log("warn", `ERROR AL BUSCAR EL PRODUCTO POR CATEGORIA: ${err}`)  
    }
}

module.exports = {getAllProductos,postNvoProd,getProdId,modificarProd,deleteProducto, getCategoria}