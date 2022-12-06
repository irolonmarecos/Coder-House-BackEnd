const handlebars = require("express-handlebars");
const path = require('path')
const hbs = handlebars.create({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: (path.join(__dirname, '../', 'layout'))
}) 

module.exports = hbs