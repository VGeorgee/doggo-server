//let app = require('./src/app')

let fs = require('fs')

var express = require('express')
var bodyParser = require('body-parser')
var app = express();


const SUCCESS =  {message: 'SUCCESS'}
const FAIL = {message: 'FAIL'}



app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
let users = require('./database/users.json').users

console.log(users)

app.post('/api/login', function (req, res) {
   console.log(req.body);
   
   if(users.find(user => user.username === req.body.username && user.password === req.body.password)){
      res.send(SUCCESS);
      return 
   }
   res.send(FAIL);
})

app.post('/api/register', function (req, res) {
    if(users.find(user => user.username === req.body.username)){
        res.send({message: 'FAIL'});
        return 
    }
    users.push({ username : req.body.username, password: req.body.password })
    fs.writeFile('./database/users.json', JSON.stringify({'users': users}, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
      })

    res.send({message: 'SUCCESS'});
})

app.get('/api/leaderboard', function (req, res) {
    res.send('Helldo World');
 })

 app.get('/v', function (req, res) {
    res.send('Hello World');
 })


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})