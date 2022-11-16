const express = require('express');
const {Router} = express
const { fork } = require('child_process')
const {objeto} = require('../config')

const routerNumRandoms = Router()

routerNumRandoms.get('/',(req,res)=>{
    res.send(`Bienvenido, Servidor escuchando puerto: ${objeto.p}, proceso: ${process.pid}`)
})


module.exports = routerNumRandoms