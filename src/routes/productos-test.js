const express = require('express');
const {Router} = express
const {faker} = require('@faker-js/faker')
const productosRandom = require('../controllers/productos-test')
const routerProductos = Router()


routerProductos.get("/",productosRandom)

module.exports = routerProductos