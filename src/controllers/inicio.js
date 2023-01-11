const {
    loggerDev,
    loggerProd
} = require('../Utils/logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production" ?
    loggerDev :
    loggerProd

function paginaInicioSesion(req, res) {
    const usuario = req.session.user
    if (!usuario) {
        res.send('Debe iniciar sesion')
    } else {
        res.redirect('/productos')
    }
}

function paginaInicio(req, res) {
    let usuario = req.body.usuario;
    req.session.usuario = usuario
    if (usuario) {
        res.send('Debe iniciar sesion')
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