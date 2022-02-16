const { io } = require('../http')

async function insertUserOnline (socket, data) {
    const usersOnline = []
    room = data.room
    socket.join(data.room)
    socket.data.username = data.username
    const socketsOnline = await io.in(data.room).fetchSockets()
    for (const socket of socketsOnline) {  
        usersOnline.push({
            username: socket.data.username,
            idSocket: socket.id
        })
    }
    io.to(data.room).emit('user online', usersOnline)
}

module.exports = {
    insertUserOnline
}