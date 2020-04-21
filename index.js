var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let response = require('./src/response')
let db = require('./database')

app.post('/api/login', function (req, res) {

   if(db.users.find(user => user.username === req.body.username && user.password === req.body.password)){
      return res.send(response.SUCCESS)
   }
   res.send(response.FAIL)
})



app.post('/api/register', function (req, res) {

   if(req.body.password.length < 3 ||
      req.body.username.length < 3 ||
      db.isUserExists(req.body.username)){
      return res.send(response.FAIL)
   }

   db.updateUsers(req.body)

   res.send(response.SUCCESS)
})

app.get('/api/leaderboard', function (req, res) {
   res.send(db.leaderboard)
})

app.post('/api/leaderboard', function (req, res) {   
   res.send( db.updateLeaderboard(req.body) ? response.SUCCESS : response.FAIL )
})

app.post('/api/multiplayer', function (req, res) {
   res.send({username: "asdaq", ip: "192.168.1.103:8080"})
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})