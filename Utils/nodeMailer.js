require('dotenv').config()
const nodemailer = require('nodemailer')
const EMAIL = process.env.EMAIL
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

const { loggerDev, loggerProd} =  require('../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL,
        pass: GMAIL_PASSWORD
    }
});
const receptor = "litire2691@sopulit.com"

async function envioMail (usuario) {
    try {
        const info = await transporter.sendMail({
            to: receptor,
            from: EMAIL,
            subject: "Nuevo Usuario Registrados",
            text: `El usuario se registro con el E-Mail: ${usuario}`
        });
        logger.log('info', "Correo enviado satisfactoriamente");

    } catch (err) {
        logger.log('error', `Se ha producido un error ${err}`)

    }
}
const enviarOrden = async (pedido) => {
    try {
        const info = await transporter.sendMail({
            to: receptor,
            from: EMAIL,
            subject: "Nueva orden Registrada",
            text: ` Su orden ha sido realizada, a continuacion podra ver su pedido:  ${pedido}`
        });
        logger.log('info', "Correo de orden enviado satisfactoriamente");

    } catch (err) {
        logger.log('error', `Se ha producido un error ${err}`)
    }
}
module.exports = { envioMail, enviarOrden }