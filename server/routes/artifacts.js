const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getWorkspace, updateWorkspace } = require('../helpers/getWorkspace');

/* Download document. */
router.get('/documents/download/:sectionName/:fileName', (req, res) => {
  if (req.session.loggedIn) {
    const groupId = req.session.groupId
    const file = `/../uploads/${groupId}/${req.params.sectionName}/${req.params.fileName}`;

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
        const groupId = req.session.groupId
        const sectionName = req.body.section;

        const fileLocation = `./uploads/${groupId}/${sectionName}/` + file.name;

        file.mv(fileLocation);

        const artifact = {
          "type": "file",
          "name": file.name,
          "url": fileLocation
        }

        const workspaceData = getWorkspace(groupId);
        const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);
  
        workspaceData.sections[sectionIndex].artifacts.push(artifact)
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
router.get('/list/:group_id/:sectionName', (req, res) => {
  if (req.session.loggedIn) {
    const groupIdRequested = req.params.group_id;
    const groupId = req.session.groupId;
    const sectionName = req.params.sectionName;

    if (groupIdRequested === groupId) {    
      const folder = `./uploads/${groupIdRequested}/${sectionName}/`

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
    }

  } else {
    res.status(401).send("User is not logged in!");
  }

});

/*Delete a Document*/
router.delete('/delete/document/:sectionName/:fileName',(req, res) => {
  if (req.session.loggedIn) {
    const sectionName = req.params.sectionName;
    const fileName = req.params.fileName;
    const groupId = req.session.groupId;

    const workspaceData = getWorkspace(groupId);
    const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);
    const artefactIndex = workspaceData.sections[sectionIndex].artifacts.findIndex(artefact => artefact.name === fileName);

    workspaceData.sections[sectionIndex].artifacts.splice(artefactIndex, 1)
    updateWorkspace(groupId, workspaceData);

    const file = `/../uploads/${groupId}/${req.params.sectionName}/${req.params.fileName}`;
    const filePath = path.join(__dirname, file);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error : ", err);
        res.status(404).end()
      }
    });

    res.status(200).send("File name: "+ req.params.fileName +" Deleted.");
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
        const sectionName = req.body.section;
        const linkName = req.body.linkName;
        const linkUrl = req.body.linkUrl;
        const groupId = req.session.groupId;

        const artifact = {
          "type": "link",
          "name": linkName,
          "url": linkUrl
        }

        const workspaceData = getWorkspace(groupId);
        const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);
        
        workspaceData.sections[sectionIndex].artifacts.push(artifact)
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

/*Delete a link*/
router.delete('/delete/link/:sectionName/:linkName',(req, res) => {
  if (req.session.loggedIn) {
    const sectionName = req.params.sectionName;
    const linkName = req.params.linkName;
    const groupId = req.session.groupId;

    const workspaceData = getWorkspace(groupId);

    const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);
    const artefactIndex = workspaceData.sections[sectionIndex].artifacts.findIndex(artefact => artefact.name === linkName);

    workspaceData.sections[sectionIndex].artifacts.splice(artefactIndex, 1)
    updateWorkspace(groupId, workspaceData);

    res.status(200).send("Link name: "+ linkName +" Deleted.");
  } else {
    res.status(401).send("User not logged in!");
  }
});

module.exports = router;
