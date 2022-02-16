var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')

var privateMessages = document.getElementById('private-messages')
var privateForm = document.getElementById('private-form')
var privateInput = document.getElementById('private-input')

var users = document.getElementById('users')
// var user = document.getElementById('idSocket')

const socket = io()
const urlSearch = new URLSearchParams(window.location.search)
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

var userSelected


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


privateForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(privateInput.value) {
    socket.emit('private message', {
      msg: privateInput.value,
      to: userSelected,
    })
    privateInput.value = ''
  }
})


function addListenerUserClick (idsocket) {
  const user = document.getElementById(`${idsocket}`)
  user.addEventListener('click', e => {
    userSelected = e.target.attributes.idsocket.value
    const privateChat = document.getElementById('private-chat')
    privateChat.style.display = "flex"
    const chatPublic = document.getElementById('chat')
    chatPublic.style.display = "none"
  })
}

socket.emit('select_room', {
    room,
    username
})

socket.on('chat message', msg => {
    var item = document.createElement('li')
    item.textContent = msg
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})

socket.on('user online', usersOnline => {
    users.innerHTML = ""
    usersOnline.map(user => {
      const li = document.createElement('li')
      li.textContent = user.username
      li.setAttribute("idsocket", user.idSocket)
      li.id = `${user.idSocket}`
      users.appendChild(li)
      addListenerUserClick(user.idSocket)
    }) 
})


socket.on('new_msg', msg => {
    var item = document.createElement('li')
    item.textContent = msg.msg
    privateMessages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
