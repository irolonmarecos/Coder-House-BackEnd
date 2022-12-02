const express = require('express');
const routerSignup = express.Router()
const passport = require('passport');
const {
    signupInicio,
    signupPost
} = require('../controllers/signup')


routerSignup.get('/',signupInicio)

routerSignup.post('/',passport.authenticate('signup',{failureRedirect:'/signup'}),signupPost)


module.exports = routerSignup