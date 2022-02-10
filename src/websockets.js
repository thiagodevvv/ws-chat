const { io } = require('./http')

io.on('connection', (socket) => {
    console.log(`user ID: ${socket.id}`)
    console.log('a user connect')
    socket.on('disconnect', () => console.log('user disconnected'))
    socket.on('select_room', data => {
        room = data.room
        socket.join(data.room)
        io.emit('user online', data.username)
    })
    socket.on('chat message', data => {
        io.to(data.room).emit('chat message', data.msg)// io é pra quando queremos enviar global, nesse caso para todos da room.
    })
    socket.on('private message', msg => {
        
    })
})