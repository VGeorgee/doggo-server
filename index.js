var express = require('express')
var bodyParser = require('body-parser')
var app = express();

let response = require('./src/response')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let db = require('./database')


app.post('/api/login', function (req, res) {
   
   console.log("login post req: ", req.body);
   
   if(req.body.username.length < 3 || req.body.password.length < 3){
      return res.send(response.FAIL)
   }

   if(db.users.find(user => user.username === req.body.username && user.password === req.body.password)){
      return res.send(response.SUCCESS);
   }
   res.send(response.FAIL);
})



app.post('/api/register', function (req, res) {
   console.log("register post req: ", req.body);

   if(req.body.password.length < 3 || req.body.username.length < 3){
      res.send(response.FAIL);
   }
   
   if(db.users.find(user => user.username === req.body.username)){
      res.send(response.FAIL);
      return 
   }

   db.users.push({ username : req.body.username, password: req.body.password })

   db.updateUsers();

   res.send(response.SUCCESS);
})

app.get('/api/leaderboard', function (req, res) {
   console.log("leaderboard get req");
   res.send(db.leaderboard)
})

app.post('/api/leaderboard', function (req, res) {
   console.log("leaderboard post req: " , req.body);

   if(!db.leaderboard.find(user => user.username === req.body.username)){
      db.leaderboard.push({username: req.body.username, points: 0})
   }

   db.leaderboard.find(user => user.username === req.body.username).points += req.body.points

   db.updateLeaderboard()
   
   res.send(response.SUCCESS)
})


app.post('/api/multiplayer', function (req, res) {

   res.send({username: "asdaq", ip: "192.168.1.103:8080"})
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})