const express = require('express');
const {Router} = express
const randomFunction = require('../controllers/randoms')

const routerNumRandoms = Router()

routerNumRandoms.get('/',randomFunction)


module.exports = routerNumRandoms