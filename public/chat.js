var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')

var users = document.getElementById('users')

const socket = io()
const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

socket.emit('select_room', {
    room,
    username
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if(input.value) {
    socket.emit('chat message', {
        msg: input.value,
        room: room,
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


socket.on('user online', usersOnline => {
  console.log('chamou event user online')
  console.log(usersOnline)
    users.innerHTML = ""
    usersOnline.map(user => {
      const li = document.createElement('li')
      li.textContent = user
      users.appendChild(li)
    }) 
})