const path = require('path')
const ProductoMongo = require('../DAOs/productos');
const { loggerDev, loggerProd} =  require('../../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd





function paginaNvoProd (req,res) {
    res.sendFile(path.join(__dirname, '../', 'public','registro-prods.html'))
}

async function postNvoProd (req,res){
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const url = req.body.url;
    const prod = new producto({nombre,descripcion,precio,stock,url})
    const result = await nvoProd.save(prod)
    logger.log("info", `Producto creado satisfactoriamente`)
}

module.exports = {paginaNvoProd,postNvoProd}