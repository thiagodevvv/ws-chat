const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)



app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connect')
    socket.on('disconnect', () => console.log('user disconnected'))
    socket.on('chat message', msg => {
        console.log('msg:' + msg)
        io.emit('chat message', msg)
        io.emit('chat message', "mensagem do ad")
    })
    setInterval(() => {
        io.emit('chat message', "toma!")
    }, 1000)
})

server.listen(3000, () => {
    console.log(`Server started at port: 3000`)
})




