const path = require('path')
const { loggerDev, loggerProd} =  require('../../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

function signupInicio (req, res) {
    res.sendFile(path.join(__dirname, '../', 'public','signup.html'))
}

function signupPost (req,res){
    res.redirect('/login')
    logger.log("info", `Usuario creado Satisfactoriamente`)
}

module.exports = {signupInicio,signupPost}