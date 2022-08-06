const express = require('express');
const router = express.Router();
const getUser = require('../helpers/getuser');

/* Get users */
router.get('/', (req, res, next) => {
  res.send('Endpoint placegolder to get active users');
});

/* Login */
router.post('/login',
  (req, res, next) => {
    const {username, password} = req.body;
    const userData = getUser(username);

    // User not found
    if (!userData) {
      res.status(401).send("Bad username!");
      return
    }

    // Password is not set or is wrong
    const realPassword = userData.password;
    if (!realPassword || realPassword !== password) {
      res.status(401).end("Bad password!");
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
