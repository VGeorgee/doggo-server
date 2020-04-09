//let app = require('./src/app')

let fs = require('fs')

var express = require('express')
var bodyParser = require('body-parser')
var app = express();

let response = require('./src/response')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let users = require('./database/users').users
console.log(users)


let leaderboard = require('./database/leaderboard').leaderboard
console.log(leaderboard)


app.post('/api/login', function (req, res) {
   
   console.log("login post req: ", req.body);
   
   if(req.body.username.length < 3 || req.body.password.length < 3){
      return res.send(response.FAIL)
   }

   if(users.find(user => user.username === req.body.username && user.password === req.body.password)){
      return res.send(response.SUCCESS);
   }
   res.send(response.FAIL);
})



app.post('/api/register', function (req, res) {

   console.log("register post req: ", req.body);

   if(users.find(user => user.username === req.body.username)){
      res.send(response.FAIL);
      return 
   }
   users.push({ username : req.body.username, password: req.body.password })
   fs.writeFile('./database/users.json', JSON.stringify({'users': users}, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
   })

   res.send(response.SUCCESS);
})

app.get('/api/leaderboard', function (req, res) {
   console.log("leaderboard get req: " , req.body);
   res.send(leaderboard)
})


app.post('/api/leaderboard', function (req, res) {

   console.log("leaderboard post req: " , req.body);
   

   if(!leaderboard.find(user => user.username === req.body.username)){
      leaderboard.push({username: req.body.username, points: 0})
   }

   leaderboard.find(user => user.username === req.body.username).points += req.body.points

   leaderboard.sort((usera, userb) => {
      return userb.points - usera.points
   })

   fs.writeFile('./database/leaderboard.json', JSON.stringify({'leaderboard': leaderboard}, null, 2), err => {
      if (err) {
        console.error(err)
        return
      }
   })

   res.send(response.SUCCESS)
})

 app.get('/test', function (req, res) {
   res.send('Hello World');
 })

 app.get('/users', function (req, res) {
   res.send(users);
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})