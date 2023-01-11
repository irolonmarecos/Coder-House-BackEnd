const path = require('path')

function paginaLogin(req, res) {
    res.send('Ingrese credenciales para iniciar sesion')
}

function postLogin(req, res) {
    req.session.user = req.user;
    const username = req.session.user.username
    res.send(`Sesion iniciada ${username}`)

}

module.exports = {
    paginaLogin,
    postLogin
}