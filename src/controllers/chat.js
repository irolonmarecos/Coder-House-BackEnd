function chat(){
    async(socket)=>{
        const totalMensajes = await nvoMsj.getAll();
        socketServer.emit(events.TOTAL_MENSAJES, totalMensajes)
        socket.on(events.ENVIAR_MENSAJE, async(msg)=>{
            const MENSAJE = new mensaje(msg)
            const result = await nvoMsj.save(MENSAJE)
            socketServer.sockets.emit(events.NUEVO_MENSAJE, msg)
        })
        const pesoNormMsjs = JSON.stringify(totalMensajes).length / 1024
        socketServer.sockets.emit('porcentaje', totalMensajes, pesoNormMsjs)
    }
}

module.exports = chat