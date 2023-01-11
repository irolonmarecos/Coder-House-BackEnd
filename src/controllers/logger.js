function logger() {
    const { loggerDev, loggerProd} =  require('../../logger_config')
    const NODE_ENV = process.env.NODE_ENV || "development";
    const logger = NODE_ENV === "production"
        ? loggerDev
        : loggerProd
    return logger
}

module.exports = {logger}