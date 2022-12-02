const express = require('express');
const routerLogout = express.Router()
const cerrarSesion = require('../controllers/logout')
const { loggerDev, loggerProd} =  require('../../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd


routerLogout.get('/',cerrarSesion)


module.exports = routerLogout