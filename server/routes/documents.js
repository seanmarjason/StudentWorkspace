const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getUser } = require('../helpers/getuser');
const { getWorkspace, updateWorkspace } = require('../helpers/getWorkspace');

/* Download document. */
router.get('/download/:sectionName/:fileName', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.userName;
    const {group_id} = getUser(username);
    const file = `/../uploads/${group_id}/${req.params.sectionName}/${req.params.fileName}`;

    const filePath = path.join(__dirname, file)

    res.download(filePath, (err) => {
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
        // const username = req.session.userName;

        // const { group_id } = getUser(username);

        const sectionName = req.body.section;
        const groupId = req.body.groupId;

        const fileLocation = `./uploads/${groupId}/${sectionName}/` + file.name;

        file.mv(fileLocation);

        const artifact = {
          "type": "file",
          "name": file.name,
          "url": fileLocation
        }

        const workspaceData = getWorkspace(groupId);
        const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);

        console.log(artifact)
        workspaceData.sections[sectionIndex].artifacts.push(artifact)
        console.log(workspaceData.sections[sectionIndex].artifacts)

        updateWorkspace(groupId, workspaceData);

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
router.delete('/delete/:sectionName/:fileName',(req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.userName;
    const {group_id} = getUser(username);
    const file = `/../uploads/${group_id}/${req.params.sectionName}/${req.params.fileName}`;

    const filePath = path.join(__dirname, file);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error : ", err);
        res.status(404).end()
      }
      res.status(200).send("File name: "+ req.params.fileName +" Deleted.");
    });

  } else {
    res.status(401).send("User not logged in!");
  }

});
module.exports = router;
