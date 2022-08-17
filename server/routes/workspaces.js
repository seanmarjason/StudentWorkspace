const express = require('express');
const router = express.Router();
const { getWorkspace, updateWorkspace } = require('../helpers/getWorkspace');

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
    workspaceData.sections.push(sectionName);

    updateWorkspace(groupId, workspaceData);

    res.status(200).send(workspaceData);

  } else {
    console.log("Error: User not logged in")
    res.status(401).send("User not logged in!");
  }

});

module.exports = router;
