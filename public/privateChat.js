var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')
const socket = io()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if(input.value) {
    socket.emit('private message', {
        msg: input.value
    })
    input.value = ''
  }
})

socket.on('chat message', msg => {
    var item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})