const express = require('express');

const {
    Server: SocketServer
} = require('socket.io')
const {
    Server: HTTPServer
} = require('http');

const app = express();
const events = require('./src/public/js/sockets_events');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const {
    envioMail,
    enviarOrden
} = require('./src/Utils/nodeMailer')

const {
    objeto,
    baseDatos
} = require('./config')

const {
    paginaInicioSesion,
    paginaInicio,
    rutaDesconocida
} = require('./src/controllers/inicio')

const hbs = require('./src/views/config/hbs')
const {
    mensaje
} = require('./src/schema/mensajes')
const MensajeMongo = require('./src/DAOs/mensajes')
const nvoMsj = new MensajeMongo
const connection = require('./src/dataBase');
const connectionPassport = require('./src/middleware/passport/index')
const {
    loggerDev,
    loggerProd
} = require('./logger_config')
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production" ?
    loggerDev :
    loggerProd

//  RUTAS

const routerNuevoProd = require('./src/routes/registroProductos')
const routerProductos = require('./src/routes/productos-test')
const routerInfo = require('./src/routes/info')
const routerLogin = require('./src/routes/login')
const routerSignup = require('./src/routes/signup')
const routerLogout = require('./src/routes/logout')
//const routerNumRandoms = require('./routes/randoms')

connection()
connectionPassport()

app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    store: MongoStore.create({
        mongoUrl: baseDatos,
        mongoOptions,
        ttl: 600,
        retries: 0
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session())
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './src/views');

//RUTAS
app.use('/registro', routerNuevoProd)
app.use('/test/info', routerInfo)
app.use('/test/productos', routerProductos)
app.use('/login', routerLogin)
app.use('/signup', routerSignup)
app.use('/logout', routerLogout)

//PAGINA INICIO
app.get("/", paginaInicioSesion);
app.post("/", paginaInicio)
app.get('/*', rutaDesconocida)

//const chat = require('./src/controllers/chat')

socketServer.on('connection', async (socket) => {
    const totalMensajes = await nvoMsj.getAll();
    socketServer.emit(events.TOTAL_MENSAJES, totalMensajes)
    socket.on(events.ENVIAR_MENSAJE, async (msg) => {
        const MENSAJE = new mensaje(msg)
        const result = await nvoMsj.save(MENSAJE)
        socketServer.sockets.emit(events.NUEVO_MENSAJE, msg)
    })
    const pesoNormMsjs = JSON.stringify(totalMensajes).length / 1024
    socketServer.sockets.emit('porcentaje', totalMensajes, pesoNormMsjs)
})

const server = httpServer.listen(objeto.p, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${objeto.p}, proceso: ${process.pid}`);
})

server.on('error', (err) => {
    logger.log('warn', `Error al iniciar el servidor ${err}`)
})