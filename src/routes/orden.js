const express = require('express');
const {
    Router
} = express
const {
    getOrden,
    postOrden
} = require('../controllers/orden')
const auth = require('../middleware/auth')

const routerOrden = Router()

routerOrden.get('/', auth, getOrden)

routerOrden.post('/', auth, postOrden)

module.exports = routerOrden