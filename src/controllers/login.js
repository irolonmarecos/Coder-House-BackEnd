const path = require('path')

function paginaLogin(req, res) {
    res.sendFile(path.join(__dirname, '../', 'public', 'login.html'))
}

function postLogin(req, res) {
    req.session.user = req.user;
    res.redirect('/')

}

module.exports = {
    paginaLogin,
    postLogin
}