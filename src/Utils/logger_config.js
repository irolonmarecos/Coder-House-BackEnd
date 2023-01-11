const winston = require('winston');

const loggerDev = winston.createLogger({
    level:"debug",
    transports:[
        new winston.transports.Console({level:"info"})
    ]
})

const loggerProd = winston.createLogger({
    level:'debug',
    transports:[
        new winston.transports.File({filename:"src/logs/info.log", level:"info"}),
        new winston.transports.File({filename:"src/logs/warn.log", level:"warn"}),
        new winston.transports.File({filename:"src/logs/error.log", level:"error"})
    ]
})

module.exports= {
    loggerDev,
    loggerProd
}