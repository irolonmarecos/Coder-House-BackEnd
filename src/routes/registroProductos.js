const express = require('express');
const {Router} = express
const {
    paginaNvoProd,
    postNvoProd,
    getProdId,
    modificarProd,
    deleteProducto
    }= require('../controllers/nvoProd')

const routerNuevoProd = Router()

routerNuevoProd.get('/',paginaNvoProd)

routerNuevoProd.get('/:id',getProdId)

routerNuevoProd.post('/', postNvoProd)

routerNuevoProd.put('/:id', modificarProd)

routerNuevoProd.delete('/:id', deleteProducto)

module.exports = routerNuevoProd