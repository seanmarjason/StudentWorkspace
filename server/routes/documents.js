const express = require('express');
const router = express.Router();
const getUser = require('../helpers/getuser');

const response = {
  key: 'value'
}

/* Placeholder to download document. */
router.get('/download', (req, res, next) => {
  res.json(response);
});

/* Upload document. */
router.post('/upload', async (req, res) => {
  if(req.session.loggedIn) {
    try {
      if(!req.files) {
        res.send({
          status: false,
          message: 'No file to upload'
        });
      } else {
        const file = req.files.file;
        const username = req.session.userName;
        const {user_id, group_id} = getUser(username);

        console.log('File belongs to user: ' + username + 
                    '| id: ' + user_id + 
                    '| group_id: ' + group_id);

        file.mv(`./documents/${group_id}/` + file.name);

        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: file.name,
            mimetype: file.mimetype,
            size: file.size
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(401).send("User not logged in!");
  }
});

module.exports = router;
