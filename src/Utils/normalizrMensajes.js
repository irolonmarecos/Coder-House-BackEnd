const {normalize, schema} = require('normalizr');

const author = new schema.Entity("authors", {})

const mensaje = new schema.Entity("mensajes", {
    author:author
},{idAttribute:"_id"})



const normalizr = (info)=>{
    let data;
    let msjs;
    let totalMensajes = info.map(msg => {
        if(msg._doc.author){
            msjs = {...msg._doc, _id: msg._doc.author.id }
            return msjs
        } else {
            data = info
            return info
        }
    })
    if(data){
        return info
    }else if(msjs){
        const normalizar = normalize(totalMensajes, [mensaje])
        return normalizar
    }


}

module.exports = normalizr