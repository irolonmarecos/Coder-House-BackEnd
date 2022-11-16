const AlmacenMongo = require('../Utils/conteinerMongo')
const {producto} = require('../schema/productos');

class ProductoMongo extends AlmacenMongo {
    constructor(){
        super(producto);
    }
}

module.exports = ProductoMongo;