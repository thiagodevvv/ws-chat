const { io } = require('./http')

io.on('connection',  (socket) => {
    let usersOnline = []
    console.log(`user ID: ${socket.id}`)
    console.log('a user connect')
    socket.on('disconnect', () => console.log('user disconnected'))
    socket.on('select_room', async data => {
        room = data.room
        socket.join(data.room)
        socket.data.username = data.username
        const socketsOnline = await io.in(data.room).fetchSockets()
        for (const socket of socketsOnline) {  
            io.emit('user online', socket.data.username)
            console.log(socket.id);
            console.log(socket.data);  
        }
    })
    socket.on('chat message', data => {
        io.to(data.room).emit('chat message', data.msg)// io é pra quando queremos enviar global, nesse caso para todos da room.
    })
    socket.on('private message', msg => {
        
    })
})