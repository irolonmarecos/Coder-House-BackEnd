const express = require('express');
const {Router} = express

const routerNuevoProd = Router()

routerNuevoProd.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/registro-prods.html")
})



module.exports = routerNuevoProd