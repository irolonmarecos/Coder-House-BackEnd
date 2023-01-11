const express = require('express');
const routerLogout = express.Router()
const cerrarSesion = require('../controllers/logout')



routerLogout.get('/',cerrarSesion)


module.exports = routerLogout