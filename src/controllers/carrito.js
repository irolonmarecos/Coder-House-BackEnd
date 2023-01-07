const {carrito} = require('../schema/carrito')
const factory = require('../DAOs/factory')
const carritoDAO = factory.carritDAO()
const productosDAO = factory.productosDAO()
const usuarioDAO = factory.usuarioDAO()
const moment = require('moment')

const { loggerDev, loggerProd} =  require('../../logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
    ? loggerDev
    : loggerProd

async function getCarrito (req,res){
    try{
        const usuario = req.session.user.username
        const carrito =  await carritoDAO.getByUser(usuario)
        res.send(carrito)
    }catch(err){
        logger.log("warn", `ERROR AL MOSTRAR EL CARRITO : ${err}`)
    }
}

async function postCarrito (req,res){
    try{
        const user = req.session.user;
        const producto = req.body.producto
        const descripcionProd = await productosDAO.getByName(producto)
        const cantidad = req.body.cantidad
        const usuario = user.username
        const prodsCarrito = await carritoDAO.getByUser(usuario)
        const fecha_hora =  moment().format("DD MM YYYY hh:mm:ss");
        const email = user.email
        const direccion = user.direccion
        const chequeoProd = await productosDAO.getByName(producto)
        
        if(chequeoProd == null){
            return res.send('EL PRODUCTO SOLICITADO NO EXISTE')
        } else if (cantidad > descripcionProd.stock){
           return res.send('NO POSEE ESA CANTIDAD EN STOCK')
        }else if (0 > cantidad){
           return res.send('NO SE PERMITE CANTIDAD EN NEGATIVO')
        }
        const item = {nombre:descripcionProd.nombre, cantidad:cantidad, precio_unitario: descripcionProd.precio, Total:(descripcionProd.precio)*cantidad}
        
        if(prodsCarrito == null){
           const idProd = descripcionProd._id.toString()
           const prodID = {_id: idProd}
           descripcionProd.stock = descripcionProd.stock - cantidad
           const nvoCarrito = new carrito({usuario,fecha_hora,email,item,direccion})
           nvoCarrito.total_pagar = item.Total
           const resultCarrito = await carritoDAO.save(nvoCarrito)
           await productosDAO.updateById(prodID,descripcionProd)
           return res.send(resultCarrito);
        }
     
        const nombreProd = prodsCarrito.item.find(producto=>producto);
        const itemDuplicado = {nombre:descripcionProd.nombre, cantidad:nombreProd.cantidad + cantidad, precio_unitario: descripcionProd.precio, Total:(descripcionProd.precio)*cantidad + nombreProd.Total}
        const indexItems = prodsCarrito.item.findIndex((el) =>{
           return el.nombre == producto
        })
        const prodIndex = indexItems
        if(prodsCarrito.usuario == usuario && indexItems != -1){
           const idProd = descripcionProd._id.toString()
           const prodID = {_id: idProd}
           descripcionProd.stock = descripcionProd.stock - cantidad
           const idCarrito = prodsCarrito._id.toString()
           prodsCarrito.item[indexItems] = itemDuplicado
           prodsCarrito.total_pagar =+ itemDuplicado.Total
           const modCarrito = await carritoDAO.updateById(idCarrito,prodsCarrito)
           await productosDAO.updateById(prodID,descripcionProd)
           return res.send(modCarrito)
        }
        if(prodsCarrito.usuario == usuario){
           const idProd = descripcionProd._id.toString()
           const prodID = {_id: idProd}
           descripcionProd.stock = descripcionProd.stock - cantidad
           const idCarrito = prodsCarrito._id.toString()
           prodsCarrito.item.push(item)
           prodsCarrito.total_pagar =+ itemDuplicado.Total
           await productosDAO.updateById(prodID,descripcionProd)
           const modCarrito = await carritoDAO.updateById(idCarrito,prodsCarrito)
           return res.send(modCarrito)
        }    
    } catch(err){
        logger.log("warn", `ERROR AL GUARDAR PRODUCTOS EN EL CARRITO :${err}`)
    }
}

async function getCarritoById (req,res) {
    try{
        const id = req.params.id
        const carrito = await carritoDAO.getById(id)
        res.send(carrito)
    }catch(err){
        logger.log("warn", `ERROR AL MOSTRAR EL CARRITO : ${err}`)       
    }
}

async function updateCarritoById (req,res){
    try{
        const id = req.params.id;
        const prodID = {_id: id};
        const carrito = await carritoDAO.getById(id)
        const totalPagar = carrito.item.reduce((acumulador, actual) => acumulador + actual.Total, 0);
        const {
           email,
           item,
           direccion
        } = req.body
        const carritoActualizado = {
           usuario:carrito.usuario,
           fecha_hora:carrito.fecha_hora,
           email,
           item,
           total_pagar:totalPagar,
           direccion
        } 
        const nuevoCarrito = await carritoDAO.updateById(prodID,carritoActualizado);
        res.send(nuevoCarrito)
     
    }catch(err){
        logger.log("warn", `ERROR AL ACTUALIZAR EL CARRITO : ${err}`)
    }
}

async function deleteCarritoById (req,res) {
    try{
        const id = req.params.id;
        const borrar = await carritoDAO.deleteById(id);
        res.send('EL CARRITO SE A BORRADO EXITOSAMENTE')
    } catch(err){
        logger.log("warn", `ERROR AL BORRAR EL CARRITO : ${err}`)       
    }
}


module.exports = {
    getCarrito,
    postCarrito,
    getCarritoById,
    updateCarritoById,
    deleteCarritoById
} 