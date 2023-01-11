const factory = require('../DAOs/factory')
const msjDAO = factory.mensajesDAO()
const {mensaje} = require('../schema/mensajes')


async function getMensajes(req,res){
    try{
        const mensajes = await msjDAO.getAll()
        res.send(mensajes)
    }catch(err){
        logger.log("warn", `ERROR AL MOSTRAR LOS MENSAJES : ${err}`)

    }
}

async function postMensajes (req,res){
    try{
    const user = req.session.user
        const {nombre,apellido,alias,text} = req.body
        const MENSAJE = {
            email: user.email,
            author: {
                nombre:nombre,
                apellido: apellido,
                edad: user.edad,
                alias: alias,
                avatar: user.avatar
            },
            text: text
        }
        const nvoMsj = new mensaje(MENSAJE)
        await msjDAO.save(nvoMsj)
        res.send(nvoMsj)
    }catch(err){
        logger.log("warn", `ERROR AL GUARDAR EL MENSAJE : ${err}`)
    }
}

async function chatByMail(req,res) {
    const email = req.params.email
    const mensajes = await msjDAO.getByEmail(email)
    res.send(mensajes)
}




module.exports = {getMensajes,chatByMail,postMensajes} 