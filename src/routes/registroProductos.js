const express = require('express');
const {Router} = express
const {
    paginaNvoProd,
    postNvoProd
    }= require('../controllers/nvoProd')

const routerNuevoProd = Router()

routerNuevoProd.get('/',paginaNvoProd)

routerNuevoProd.post('/', postNvoProd)



module.exports = routerNuevoProd