const express = require('express');
const {
   Router
} = express
const {
   getCarrito,
   postCarrito,
   getCarritoById,
   updateCarritoById,
   deleteCarritoById

} = require('../controllers/carrito')
const auth = require('../middleware/auth')

const routerCarrito = Router()

routerCarrito.get('/', auth, getCarrito, postCarrito)

routerCarrito.post('/', auth, postCarrito)

routerCarrito.get('/:id', auth, getCarritoById)

routerCarrito.put('/:id', auth, updateCarritoById)

routerCarrito.delete('/:id', auth, deleteCarritoById)


module.exports = routerCarrito