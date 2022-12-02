function generadorProductos (n) {
    const productos = [];
    for (let i = 0; i < n; i++) {
        const _productos = {
            id: i+1,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.abstract()
        }
        productos.push(_productos)
    }
    return productos
}

function productosRandom(req,res) {
    const cant = req.query.cant || 10;
    const productos = generadorProductos(cant);
    res.json(productos)
}

module.exports = productosRandom