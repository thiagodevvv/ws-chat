const { io } = require('./http')
const { removeUserRoom } = require('./functions/removeUserOfflineRoom')
const { insertUserOnline } = require('./functions/insertUserOnline')

io.on('connection',  (socket) => {
    socket.on('disconnecting', async () => {
        removeUserRoom(socket)
    })
    socket.on('select_room', async data => {
        insertUserOnline(socket, data)
    })
    socket.on('chat message', data => {
        io.to(data.room).emit('chat message', data.msg)// io é pra quando queremos enviar global, nesse caso para todos da room.
    })
    socket.on('private message', msg => {
        
    })
})