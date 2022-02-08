const socket = io()

const urlSearch = new URLSearchParams(window.location.search)
const room = urlSearch.get("select_room")



socket.emit('select_room', {
    room
})

socket.on('chat message', (msg) => {
    console.log(msg)
    var item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})