const { io } = require('./http')

io.on('connection',  (socket) => {
    socket.on('disconnecting', async reason => {
        const usersOnline = []
        const [, room] = socket.rooms
        const socketsOnline = await io.in(room).fetchSockets()
        for (const socket of socketsOnline) {
            if(socket.connected)
                usersOnline.push(socket.data.username)
              
        }
        io.emit('user online', usersOnline)
    })
    socket.on('select_room', async data => {
        const usersOnline = []
        room = data.room
        socket.join(data.room)
        socket.data.username = data.username
        const socketsOnline = await io.in(data.room).fetchSockets()
        for (const socket of socketsOnline) {  
            usersOnline.push(socket.data.username)
        }
        io.emit('user online', usersOnline)

    })
    socket.on('chat message', data => {
        io.to(data.room).emit('chat message', data.msg)// io é pra quando queremos enviar global, nesse caso para todos da room.
    })
    socket.on('private message', msg => {
        
    })
})