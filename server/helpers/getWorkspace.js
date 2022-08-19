const fs = require('fs');
const workspaces = require('../data/workspaces.json');

function getWorkspace(groupId) {
  const workspaceData = workspaces.find((workspace) => workspace.group_id === groupId);

  return workspaceData ? workspaceData : "Workspace not found!";
}

function getWorkspaces(groupId) {
  let response = [];

  workspaces.forEach((workspace) => {
    if (workspace.group_id === groupId) {
      response.push(workspace);
    }
  });

  return response;

}

function updateWorkspace(groupId, data) {
  const updatedWorkspaceData = workspaces.map(workspace => {
    if (workspace.group_id === groupId) {
      return data
    }
    else {
      return workspace
    }
  })

  fs.writeFileSync(
    './data/workspaces.json',
    JSON.stringify(updatedWorkspaceData), 
    {
      flag: 'w'
    }
  );
}

module.exports = {getWorkspace, getWorkspaces, updateWorkspace};
