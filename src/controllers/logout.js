const { loggerDev, loggerProd} =  require('../utils/logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

function cerrarSesion(req,res) {
    let usuario = req.session.user
    if(usuario){
        req.session.destroy();
        res.send(`El usuario ${usuario.username} ha cerrado sesion`)
    }else{
        res.redirect('/')
    }
    logger.log("info", `El Usuario a cerrado sesion`)

}

module.exports = cerrarSesion