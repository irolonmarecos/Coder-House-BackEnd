const Router = require("koa-router");
const nuevoProductoKoa = new Router({
    prefix: "/productoskoa",
  });

const { 
    getAllProductos,
    getProdById,
    nuevoProd,
    modProducto,
    deleteProd
 } = require('../controllers/prod-koa');
const ProductoMongo = require('../DAOs/productos');



nuevoProductoKoa.get('/',getAllProductos) 

nuevoProductoKoa.get('/:id', getProdById)

nuevoProductoKoa.post('/', nuevoProd)

nuevoProductoKoa.put('/:id', modProducto)

nuevoProductoKoa.delete('/:id', deleteProd)

module.exports = nuevoProductoKoa