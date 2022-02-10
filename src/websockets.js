const { io } = require('./http')

io.on('connection', (socket) => {
    console.log('a user connect')
    socket.on('disconnect', () => console.log('user disconnected'))
    socket.on('select_room', msg => {
        room = msg.room
        socket.join(msg.room)
    })
    socket.on('chat message', data => {
        io.to(data.room).emit('chat message', data.msg)
        // socket.emit('chat message', msg)
    })
})