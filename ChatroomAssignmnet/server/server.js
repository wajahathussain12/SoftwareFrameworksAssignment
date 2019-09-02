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

//All the data in the data json file is collected and sent to the Angular side
app.get('/senddata', function(req, res) {
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    res.send(users)
  })
})

// to delete the user from the data json file
app.post('/delete/user', function(req, res) {
  var deleteUser = req.body.deleteUser
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    let userData = JSON.parse(data)
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].username == deleteUser) {
        userData.splice(i, 1)
      }
    }
    newdata = JSON.stringify(userData)
    fs.writeFile('./data/data.json', newdata, 'utf8', function(err) {})
    res.send(userData)
  })
})

app.post('/create/super', function(req, res) {
  var makeSuper = req.body.makeSuper
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    let userData = JSON.parse(data)
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].username == makeSuper) {
        userData[i].role = 'superAdmin'
      }
    }
    newdata = JSON.stringify(userData)
    fs.writeFile('./data/data.json', newdata, 'utf8', function(err) {})
    res.send(userData)
  })
})

// to create a new goup and add to the group json file
app.post('/create/group', function(req, res) {
  var userObj
  var createUser = req.body.newName
  var createGroup = req.body.newGroupName
  var duplicate
  fs.readFile('./data/groupfile.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    duplicate = false
    for (let i = 0; i < users.length; i++) {
      if (createGroup == users[i].group) {
        duplicate = true
      }
    }
    if (duplicate != true) {
      console.log(createGroup)
      // console.log(createUser)
      userObj = JSON.parse(data)
      userObj.push({
        username: createUser,
        group: createGroup
      })
      var newUser = JSON.stringify(userObj)
      fs.writeFile('./data/groupfile.json', newUser, 'utf8', function(err) {
        res.send({ username: createUser })
      })
    } else {
      console.log('hmmmm')
    }
  })
})

// to add the grup array to the file
app.post('/group', function(req, res) {
  var newObj
  var newUser = req.body.newUser
  console.log(req.body.newUser)
  fs.readFile('./data/grouptestfile.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    var newUsers = JSON.stringify(users)
    // fs.writeFile('./data/groupfile.json', newUser, 'utf8', function(err) {
    res.send({ username: createUser })
    // })
  })
})

// to create the new user and  add ot the JSON file
app.post('/create/users', function(req, res) {
  var userObj
  var createUser = req.body.newName
  var createEmail = req.body.newEmail
  var createRole = req.body.newRole
  var createValid = req.body.valid
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    users = JSON.parse(data)
    let count = 0
    for (let i = 0; i < users.length; i++) {
      if (createUser != users[i].username) {
        count = users.length + 1
        userObj = JSON.parse(data)
        createValid = 'false'
        userObj.push({
          id: count,
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

// to check th eauthentication of the user and collect the data and send to angular
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
