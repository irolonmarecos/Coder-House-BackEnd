const AlmacenMongo = require('../Utils/conteinerMongo')
const {Users} = require('../schema/user');

class UsuarioMongo extends AlmacenMongo {
    constructor(){
        super(Users);
    }
}

module.exports = UsuarioMongo;