const workspaces = require('../data/workspaces.json');

function getWorkspace(workspaceId) {
  const workspaceData = workspaces.find((workspace) => workspace.id === workspaceId);

  return workspaceData ? workspaceData : "Workspace not found!";
}

function getWorkspaces(group_id) {
  let response = [];

  workspaces.forEach((workspace) => {
    if (workspace.group_id === group_id) {
      response.push(workspace);
    }
  });

  return response;

}

module.exports = {getWorkspace, getWorkspaces};
