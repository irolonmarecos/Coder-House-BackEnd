const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type Producto {
        id: ID!
        nombre: String
        descripcion: String
        precio: Int
        stock: Int
        url: String
    }

    input ProductoInput {
        id: ID!
        nombre: String
        descripcion: String
        precio: Int
        stock: Int
        url: String
    }

    type Query {
        getProducto(id: ID!): Producto
        getProductos: [Producto]
    }

    type Mutation {
        createProducto(datos: ProductoInput): Producto
        updateProducto(id: ID!, datos: ProductoInput): Producto
        deleteProducto(id: ID!): Producto
    }
`)

module.exports = schema