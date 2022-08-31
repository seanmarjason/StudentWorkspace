const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getUser } = require('../helpers/getuser');
const { getWorkspace, updateWorkspace } = require('../helpers/getWorkspace');

/* Download document. */
router.get('/documents/download/:sectionName/:fileName', (req, res) => {
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
router.post('/add/document', async (req, res) => {
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
        const sectionName = req.body.section;
        
        const user = getUser(username);
        const groupId = user.group_id.toString();

        // const groupId = req.body.groupId;

        const fileLocation = `./uploads/${groupId}/${sectionName}/` + file.name;

        file.mv(fileLocation);

        const artifact = {
          "type": "file",
          "name": file.name,
          "url": fileLocation
        }

        const workspaceData = getWorkspace(groupId);

        console.log(workspaceData)

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
      console.log(err);
      res.status(500).send(err);
    }

  } else {
    res.status(401).send("User not logged in!");
  }
});

/* Get list of documents. */
router.get('/documents/list/:group_id/:sectionName', (req, res) => {
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
router.delete('/documents/delete/:sectionName/:fileName',(req, res) => {
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

/*Add a link*/
router.post('/add/link', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      if (!req.body.linkName || !req.body.linkUrl) {
        res.send({
          status: false,
          message: 'No link to add'
        });
      } else {
        const username = req.session.userName;
        const sectionName = req.body.section;
        const linkName = req.body.linkName;
        const linkUrl = req.body.linkUrl;
        
        const user = getUser(username);
        const groupId = user.group_id.toString();

        const artifact = {
          "type": "link",
          "name": linkName,
          "url": linkUrl
        }

        const workspaceData = getWorkspace(groupId);

        console.log(workspaceData)

        const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);

        console.log(artifact)
        workspaceData.sections[sectionIndex].artifacts.push(artifact)
        console.log(workspaceData.sections[sectionIndex].artifacts)

        updateWorkspace(groupId, workspaceData);

        res.send({
          status: true,
          message: 'Link has been added'
        });
      }

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

  } else {
    res.status(401).send("User not logged in!");
  }
});

module.exports = router;
