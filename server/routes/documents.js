const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getUser } = require('../helpers/getuser');

/* Download document. */
router.get('/download/:fileName', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.userName;
    const {group_id} = getUser(username);
    const file = `documents/${group_id}/${req.params.fileName}`;

    res.download(file, (err) => {
      if (err) {
        console.log("Error : ", err);
        res.status(404).end()
      }
    });

  } else {
    res.status(401).send("User not logged in!");
  }

});

/* Upload document. */
router.post('/upload', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: 'No file to upload'
        });
      } else {
        const file = req.files.file;
        const username = req.session.userName;

        const { group_id } = getUser(username);

        const section = req.body.section;

        file.mv(`./uploads/${group_id}/${section}/` + file.name);

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

/* Get list of documents. */
router.get('/list/:group_id/:sectionName', (req, res) => {
  if (req.session.loggedIn) {
    const group_id = req.params.group_id;
    const sectionName = req.params.sectionName;

    const folder = `./uploads/${group_id}/${sectionName}/`

    let files;

    if (fs.existsSync(folder)) {
      files = fs.readdirSync(
        folder,
        { withFileTypes: true },
      );
    } else {
      files = []
    }

    const list = files.map(file => file.name);

    res.status(200).send({ documents: list });

  } else {
    res.status(401).send("User not logged in!");
  }

});

/*Delete a Document*/
router.delete('/delete/:fileName',(req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.userName;
    const {group_id} = getUser(username);
    const file = `documents/${group_id}/${req.params.fileName}`;

    fs.unlink(file, (err) => {
      if (err) {
        console.log("Error : ", err);
        res.status(404).end()
      }
      res.status(200).send("File name: "+fileName+" Deleted.");
    });

  } else {
    res.status(401).send("User not logged in!");
  }

});
module.exports = router;
