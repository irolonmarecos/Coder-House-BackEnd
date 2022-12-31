const ProductoMongo = require('../DAOs/productos');
const {producto} = require('../schema/productos')
const data = new ProductoMongo

async function getAllProductos (ctx){
    const listaProductos = await data.getAll()
    ctx.body = listaProductos
}

async function getProdById (ctx){
    const id = ctx.params.id
    const prod = await data.getById(id)
    ctx.body = prod
}

async function nuevoProd (ctx){
    const { 
        nombre,
        descripcion,
        precio,
        stock,
        url
    } = ctx.request.body;
    const prod = new producto({nombre,descripcion,precio,stock,url})
    const result = await data.save(prod)
    ctx.body = result
}

async function modProducto (ctx){
    const id = ctx.params.id
    const prodID = {_id: id}
    const {
        nombre,
        descripcion,
        precio,
        stock,
        url
    } = ctx.request.body;
    const prodActualizado = {
        nombre,
        descripcion,
        precio,
        stock,
        url
    } 
    const nuevoProducto = await data.updateById(prodID,prodActualizado)
    ctx.body = nuevoProducto
}
async function deleteProd (ctx){
    const id = ctx.params.id
    const borrar = await data.deleteById(id)
    ctx.body = 'Producto borrado'


}


module.exports = {
    getAllProductos,
    getProdById,
    nuevoProd,
    modProducto,
    deleteProd

}