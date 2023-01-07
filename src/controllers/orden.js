const factory = require('../DAOs/factory')
const carritoDAO = factory.carritDAO()
const usuarioDAO = factory.usuarioDAO()

async function getOrden (req,res) {
    try{
        const usuario = req.session.user.username
        const carrito =  await carritoDAO.getByUser(usuario)
        res.send(carrito)
    }catch(err){
        logger.log("warn", `ERROR AL MOSTRAR LA ORDEN DEL PEDIDO : ${err}`)     
    }
}

async function postOrden (req,res) {
    try{
        const userID = req.session.user._id.toString()
        const user = await usuarioDAO.getById(userID);
        const carrito = await carritoDAO.getByName(user.username)
        const carritoID = carrito._id.toString()
        const carrID = {_id: carritoID};
        user.ordenes_compra.push(carrito)
        const ActualizarUser = await usuarioDAO.updateById(userID, user)
        const ActualizarCarrito = await carritoDAO.deleteById(carrID)
    
        res.send('SE HA GENERADO LA ORDEN DE COMPRA EXITOSAMENTE') 
    }catch(err){
        logger.log("warn", `ERROR AL GENERAR LA ORDEN DEL PEDIDO : ${err}`)     
    }
}

module.exports = {
    getOrden,
    postOrden
}