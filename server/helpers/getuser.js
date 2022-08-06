const users = require('../config/users.json');

function getUser(username) {
  const userData = users.find((user) => user.username === username);

  return userData ? userData : "User not found!";
}

module.exports = getUser;