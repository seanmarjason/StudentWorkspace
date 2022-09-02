const express = require('express');
const router = express.Router();
const { getWorkspace, updateWorkspace } = require('../helpers/getWorkspace');

function swapElement(array, indexA, indexB) {
  var tmp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = tmp;
}

/* Get workspace details. */
router.get('/:groupId', (req, res) => {
  if (req.session.loggedIn) {
    const groupIdRequested = req.params.groupId;
    const groupId = req.session.groupId;

    if (groupIdRequested === groupId) {
      const workspaceData = getWorkspace(groupIdRequested);

      if (!workspaceData) {
        res.status(401).send({ error: "Workspace not found!" });
        return
      }
  
      res.status(200).send(workspaceData);
    }

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

/* Post workspace details. */
router.post('/:groupId/:sectionName', (req, res) => {
  if (req.session.loggedIn) {
    const groupIdRequested = req.params.groupId;
    const groupId = req.session.groupId;
    const sectionName = req.params.sectionName;

    if (groupIdRequested === groupId) {
      const workspaceData = getWorkspace(groupIdRequested);

      const newSection = {
        "name": sectionName,
        "artifacts": []
      }
  
      workspaceData.sections.push(newSection);
  
      updateWorkspace(groupIdRequested, workspaceData);
  
      res.status(200).send(workspaceData);
    }

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

/* Move section in Workspace UI up or down. */
router.patch('/:groupId/:sectionName/:direction', (req, res) => {
  if (req.session.loggedIn) {
    const groupIdRequested = req.params.groupId;
    const groupId = req.session.groupId;
    const sectionName = req.params.sectionName;
    const direction = req.params.direction === 'up' ? -1 : 1;

    if (groupIdRequested === groupId) {
      const workspaceData = getWorkspace(groupIdRequested);
      const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);   
      const newSectionIndex = sectionIndex + direction;
  
      if (newSectionIndex >= 0 && newSectionIndex <= workspaceData.sections.length - 1) {
        swapElement(workspaceData.sections, sectionIndex, newSectionIndex);
        updateWorkspace(groupIdRequested, workspaceData);
      }
  
      res.status(200).send(workspaceData);
    }

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

/* Get section details. */
router.get('/list/:groupId/:sectionName', (req, res) => {
  if (req.session.loggedIn) {
    const groupIdRequested = req.params.groupId;
    const groupId = req.session.groupId;
    const sectionName = req.params.sectionName;

    if (groupIdRequested === groupId) {
      const workspaceData = getWorkspace(groupIdRequested);

      if (!workspaceData) {
        res.status(401).send({ error: "Workspace not found!" });
        return
      }
  
      const sectionData = workspaceData.sections.find(section => section.name === sectionName);
  
      res.status(200).send(sectionData.artifacts);
    }

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

module.exports = router;
