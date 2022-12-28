const path = require('path')
const {producto} = require('../schema/productos')
const factory = require('../DAOs/factory')
const prodsDAO = factory.productosDAO()


const { loggerDev, loggerProd} =  require('../../logger_config')
const { text } = require('body-parser')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd





async function paginaNvoProd (req,res) {
    const listaProductos = await prodsDAO.getAll()
    //res.sendFile(path.join(__dirname, '../', 'public','registro-prods.html'))
    res.send(listaProductos)
}

async function postNvoProd (req,res){
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const url = req.body.url;
    const prod = new producto({nombre,descripcion,precio,stock,url})
    const result = await prodsDAO.save(prod)
    console.log(result);
    logger.log("info", `Producto creado satisfactoriamente`)
}



module.exports = {paginaNvoProd,postNvoProd}