const express = require('express');
const { Router } = express
const auth = require('../middleware/auth')

const {
    getMensajes,
    chatByMail,
    postMensajes

} = require('../controllers/chat');
const { route } = require('./orden');

routerChat = Router()

routerChat.get('/', auth, getMensajes)

routerChat.post('/', auth, postMensajes)

routerChat.get('/:email', auth, chatByMail)



module.exports = routerChat