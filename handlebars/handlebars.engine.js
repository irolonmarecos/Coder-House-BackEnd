const handlebars = require("express-handlebars");
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: "../Desafio 1/views/",
  partialsDir: "../Desafio 1/views/partials/"
});

module.exports = hbs;