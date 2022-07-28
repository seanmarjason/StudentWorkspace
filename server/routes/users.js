const express = require('express');
const router = express.Router();

const users = {
  "bobby": "meowmeow",
  "ricky": "notsogood"
};

/* Get users */
router.get('/', (req, res, next) => {
  res.send('Endpoint placegolder to get active users');
});

/* Login */
router.post('/login',
  (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(401).end();
        return
    }

    const realPassword = users[username];
    if (!realPassword || realPassword !== password) {
        res.status(401).end();
        return
    }

    res.locals.userName = username;
    next();
  },

  (req, res) => {
    req.session.loggedIn = true;
    req.session.userName = res.locals.userName;
    console.log(req.session);
    res.send('Login successful!');
  }
);

/* Logout */
router.delete('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout successful!');
});

module.exports = router;
