const users = require('../data/users.json');

function getUser(username) {
  const userData = users.find((user) => user.username === username);

  return userData ? userData : "User not found!";

}

function getUsers(group_id) {
  let response = [];

  users.forEach((user) => {
    if (user.group_id === group_id) {
      response.push({
          username: user.username,
          user_id: user.user_id,
          group_id: user.group_id
      });
    }
  });

  return response;

}

module.exports = {getUser, getUsers};