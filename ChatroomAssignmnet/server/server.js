var express = require('express')
var app = express()
var path = require('path')
var http = require('http').Server(app)
var bodyParser = require('body-parser')
var cors = require('cors')
var fs = require('fs')

const io = require('socket.io')(http)
const sockets = require('./socket.js')
const server = require('./listen.js')
const PORT = 3000
sockets.connect(io, PORT)

server.listen(http, PORT)

app.use(cors())
app.use(express.static(path.join(__dirname, '../dist/ChatroomAssignment/')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/senddata', function(req, res) {
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    res.send(users)
  })
})

app.post('/create/group', function(req, res) {
  console.log(req.body)
})

app.delete('delete/user', function(req, res) {
  console.log(req.body)
})

app.post('/create/users', function(req, res) {
  var userObj
  var createUser = req.body.newName
  var createEmail = req.body.newEmail
  var createRole = req.body.newRole
  var createValid = req.body.valid
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    for (let i = 0; i < users.length; i++) {
      if (createUser != users[i].username) {
        userObj = JSON.parse(data)
        createValid = 'false'
        userObj.push({
          username: createUser,
          email: createEmail,
          valid: createValid,
          role: createRole
        })
        var newUser = JSON.stringify(userObj)
        fs.writeFile('./data/data.json', newUser, 'utf8', function(err) {
          res.send({ username: createUser, email: createEmail })
        })
        break
      } else {
        console.log('hmmmm')
        break
      }
    }
  })
})

app.post('/api/auth', function(req, res) {
  validusers = {}
  validusers.username = req.body.username
  validusers.email = req.body.email
  validusers.birthdate = req.body.birthday
  validusers.age = req.body.age
  validusers.valid = req.body.valid

  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    for (let i = 0; i < users.length; i++) {
      if (validusers.username == users[i].username && validusers.email == users[i].email) {
        validusers.birthdate = users[i].birthday
        validusers.age = users[i].age
        validusers.email = users[i].email
        validusers.role = users[i].role
        validusers.valid = true
      }
    }
    res.send(validusers)
  })
})
