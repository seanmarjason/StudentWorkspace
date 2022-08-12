const express = require('express');
const router = express.Router();
const { getWorkspace } = require('../helpers/getWorkspace');

/* Get workspace details. */
router.get('/:workspaceId', (req, res) => {
  // if (req.session.loggedIn) {
    const workspaceId = req.params.workspaceId;

    const workspaceData = getWorkspace(workspaceId);

    if (!workspaceData) {
      res.status(401).send({ error: "Workspace not found!" });
      return
    }

    res.status(200).send(workspaceData);

  // } else {
  //   console.log("Error: User not logged in")
  //   res.status(401).send("User not logged in!");
  // }

});

module.exports = router;
