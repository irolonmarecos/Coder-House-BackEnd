const {
    loggerDev,
    loggerProd
} = require('../../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production" ?
    loggerDev :
    loggerProd

function paginaInicioSesion(req, res) {
    const usuario = req.session.user
    if (!usuario) {
        res.redirect('/login')
    } else {
        console.log(usuario);
        res.render('main', {
            usuario: usuario
        })
    }
}

function paginaInicio(req, res) {
    let usuario = req.body.usuario;
    req.session.usuario = usuario
    if (usuario) {
        res.redirect('/login')
    }
}

function rutaDesconocida(req, res) {
    logger.log("warn", `Ruta no encontrada ${req.url}`)
    res.status(404).send(`Ruta no encontrada ${req.url}`);
}


module.exports = {
    paginaInicioSesion,
    paginaInicio,
    rutaDesconocida
}