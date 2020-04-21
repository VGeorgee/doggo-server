
let fs = require('fs')

let users = require('./users')
console.log(users)

let updateUsers = function () {
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
   })
}


let leaderboard = require('./leaderboard')
console.log(leaderboard)

let updateLeaderboard = function () {

    leaderboard.sort((usera, userb) => {
        return userb.points - usera.points
     })
     
    fs.writeFile('./leaderboard.json', JSON.stringify(leaderboard, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
     })  
}


module.exports = {
    users, leaderboard, updateUsers, updateLeaderboard
}