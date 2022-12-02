const express = require('express');
const routerLogin = express.Router()
const {
    paginaLogin,
    postLogin
} = require('../controllers/login')
const passport = require('passport');


routerLogin.get("/",paginaLogin )

routerLogin.post("/",passport.authenticate('login',{failureRedirect:'/login'}),postLogin)

module.exports = routerLogin