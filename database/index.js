
let fs = require('fs')

let users = require('./users')
console.log(users)


function isUserExists(username) {
  return users.find(user => user.username === username)
}

function updateUsers(newUser) {

    users.push(newUser)
    leaderboard.push({username: newUser.username, points: 0})
    persistLeaderboard()
    fs.writeFile('./database/users.json', JSON.stringify(users), err => {
        if (err) {
          console.error(err)
          return
        }
   })
}


let leaderboard = require('./leaderboard')
console.log(leaderboard)

function persistLeaderboard() {
  
    leaderboard.sort((usera, userb) => {
        return userb.points - usera.points
    })

    fs.writeFile('./database/leaderboard.json', JSON.stringify(leaderboard, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
    })
}

function updateLeaderboard (update) {
    let user = leaderboard.find(user => user.username === update.username)
    if(!user){
      return false
    }
    user.points += update.points
    persistLeaderboard()
    return true
}




module.exports = {
    users, leaderboard, isUserExists, updateUsers, updateLeaderboard
}

let userEntry = {
  username: "",
  password: ""
}

let leaderboardEntry = {
  username: "",
  points: 0
}