const crypto = require('crypto');

class Producto{
    constructor(id,{nombre,descripcion,precio,stock,url}){
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.stock = stock
        this.url = url
    }
};

const containerProductos = [
    {id:'asdasd',
    nombre:'gsdg'}
];

const getProducto = ({id}) =>{
    if(!containerProductos[id]) {
        throw new Error('Producto not found')
    } ;
    return containerProductos[id];
};


const getProductos = () => {
    const prod = Object.values(containerProductos);
    return prod;
};

const createProducto = ({datos}) => {
    const id = crypto.randomBytes(10).toString('hex');
    const newProd = new Producto(id, datos);
    containerProductos[id] = newProd;
    return newProd;
};

const updateProducto = ({id, datos}) => {
    if(!containerProductos[id]) {
        throw new Error('Producto not found')
    } ;
    const updateProd = new Producto(id,datos)
    containerProductos[id] = updateProd
    return updateProd
}

const deleteProducto = ({id}) => {
    if(!containerProductos[id]) {
        throw new Error('Producto not found')
    } ;
    const deleteProd = containerProductos[id]
    delete containerProductos[id]
    return deleteProd

}

module.exports = {
    getProducto,
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto
}