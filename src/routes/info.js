const express = require('express');
const compression = require('compression')

const {Router} = express

const routerInfo = Router()
const gzipMiddleware = compression()
const info = require('../controllers/info')



routerInfo.get('/',gzipMiddleware , info)


module.exports = routerInfo