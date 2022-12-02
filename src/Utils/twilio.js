require('dotenv').config()
const TELEFONO = process.env.TELEFONO

const SID = process.env.SID
const TOKEN = process.env.TOKEN

const twilio = require('twilio')
const { info } = require('winston')
const cliente = twilio(SID, TOKEN);

const { loggerDev, loggerProd} =  require('../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

async function msjSMS (num) {
    try {
        const info = await cliente.messages.create({
            from: "+18563866108",
            to: `+${num}`,
            body:`Su orden fue recibida y se encuentra en proceso`
        })
        logger.log('info', "Whatsapp enviado al Administrador")
    } catch (err) {
        logger.log('error', `Se ha producido un error ${err}`)
    }
}

async function msjWht (user) {
    try {
        const info = await cliente.messages.create({
            from: "whatsapp:+14155238886",
            to: `whatsapp:${TELEFONO}`,
            body:` Nueva registración de usuario ${user}`
        })

        logger.log('info', "Whatsapp enviado al Admin")
    } catch (err) {
        logger.log('error', `Se ha producido un error ${err}`)
    }
}
module.exports= {msjWht, msjSMS}