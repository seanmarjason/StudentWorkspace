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
    const groupId = req.params.groupId;

    const workspaceData = getWorkspace(groupId);

    if (!workspaceData) {
      res.status(401).send({ error: "Workspace not found!" });
      return
    }

    res.status(200).send(workspaceData);

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

/* Post workspace details. */
router.post('/:groupId/:sectionName', (req, res) => {
  if (req.session.loggedIn) {
    const groupId = req.params.groupId;
    const sectionName = req.params.sectionName;

    const workspaceData = getWorkspace(groupId);

    const newSection = {
      "name": sectionName,
      "artifacts": []
    }

    workspaceData.sections.push(newSection);

    updateWorkspace(groupId, workspaceData);

    res.status(200).send(workspaceData);

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

router.patch('/:groupId/:sectionName/:direction', (req, res) => {
  if (req.session.loggedIn) {
    const groupId = req.params.groupId;
    const sectionName = req.params.sectionName;
    const direction = req.params.direction === 'up' ? -1 : 1;

    const workspaceData = getWorkspace(groupId);

    // const sectionIndex = workspaceData.sections.indexOf(sectionName);

    const sectionIndex = workspaceData.sections.findIndex(section => section.name === sectionName);

    console.log("Section index is: " + sectionIndex);
    
    const newSectionIndex = sectionIndex + direction;

    if (newSectionIndex >= 0 && newSectionIndex <= workspaceData.sections.length - 1) {
      swapElement(workspaceData.sections, sectionIndex, newSectionIndex);
      updateWorkspace(groupId, workspaceData);
    }

    res.status(200).send(workspaceData);

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

module.exports = router;
