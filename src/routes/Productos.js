const express = require('express');
const {
    Router
} = express
const auth = require('../middleware/auth')

const {
    getAllProductos,
    postNvoProd,
    getProdId,
    modificarProd,
    deleteProducto,
    getCategoria
} = require('../controllers/productos')

const routerNuevoProd = Router()

routerNuevoProd.get('/', auth, getAllProductos)

routerNuevoProd.get('/:id', auth, getProdId)

routerNuevoProd.post('/', auth, postNvoProd)

routerNuevoProd.put('/:id', auth, modificarProd)

routerNuevoProd.delete('/:id', auth, deleteProducto)

routerNuevoProd.get('/categoria/:tipo', auth, getCategoria)

module.exports = routerNuevoProd