const Koa = require('koa');
const app = new Koa();
const { koaBody } = require('koa-body');


const koaProductosRouter = require('../src/routes/koa-registro-productos')
const connection = require('../src/dataBase/index')
connection()

app.use(koaBody());

//console.log(connection());

app.use(koaProductosRouter.routes());

app.use(async (ctx) => {
    ctx.body = "Servidor ejecutandose con KOA";
  });

app.listen(3000,()=>{
    console.log('Servidor ejecutandose en puerto 3000')
});