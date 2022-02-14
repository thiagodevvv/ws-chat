const { io } = require('../http')

async function removeUserRoom (socket) {
    const usersOnline = []
    const [, room] = socket.rooms
    const socketsOnline = await io.in(room).fetchSockets()
    for (const socket of socketsOnline) {
        if(socket.connected)
            usersOnline.push(socket.data.username)
              
    }
    io.to(room).emit('user online', usersOnline)
}


module.exports = {
    removeUserRoom
}