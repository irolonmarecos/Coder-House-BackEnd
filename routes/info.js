const express = require('express');
const compression = require('compression')

const {Router} = express

const routerInfo = Router()
const gzipMiddleware = compression()


const { loggerDev, loggerProd} =  require('../logger_config')

const NODE_ENV = process.env.NODE_ENV || "development";

const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

// CON Console.log
routerInfo.get('/',gzipMiddleware ,(req,res)=>{
    //logger.log('info', 'Inicio Exitoso');
    res.send({
        'Directorio del trabajo actual ': process.cwd(),
        'ID del Proceso ': process.pid,
        'Version de Node ':process.version,
        'Titulo del proceso ': process.title,
        'Sistema Operativo ': process.platform,
        'Uso de la Memoria ': process.memoryUsage()
    })
})

/* SIN CONSOLE.LOG
routerInfo.get('/',gzipMiddleware ,(req,res)=>{
    logger.log('info', 'Inicio Exitoso');
    res.send({
        'Directorio del trabajo actual ': process.cwd(),
        'ID del Proceso ': process.pid,
        'Version de Node ':process.version,
        'Titulo del proceso ': process.title,
        'Sistema Operativo ': process.platform,
        'Uso de la Memoria ': process.memoryUsage()
    })
}) */



/*   SIN gzipMiddleware
routerInfo.get('/' ,(req,res)=>{
    logger.log('info', 'Inicio Exitoso');
    res.send({
        'Directorio del trabajo actual ': process.cwd(),
        'ID del Proceso ': process.pid,
        'Version de Node ':process.version,
        'Titulo del proceso ': process.title,
        'Sistema Operativo ': process.platform,
        'Uso de la Memoria ': process.memoryUsage()
    })
}) */

module.exports = routerInfo