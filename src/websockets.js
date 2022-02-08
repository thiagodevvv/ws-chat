const { io } = require('./http')

io.on('connection', (socket) => {
    console.log('a user connect')
    socket.on('disconnect', () => console.log('user disconnected'))
    socket.on('select_room', msg => {
        console.log('room:' + msg.room)
    })
    socket.on('chat message', msg => {
        console.log(`MSG: ${msg}`)
        socket.emit('chat message', msg)
    })
})