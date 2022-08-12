const { getWorkspace, updateWorkspace } = require('./getWorkspace')

function addDocument(file, group_id, section) {
  const location = `./uploads/${group_id}/` + file.name

  // save file
  file.mv(location);
  console.log("file saved");

  // update workspace config
  const workspace = getWorkspace(group_id);

  workspace.sections[section].push({
    title: file.name,
    type: 'document', // TODO: Remove hardcoded file type when supporting other artefacts
    link: location
  })

  updateWorkspace(workspace);
  console.log("workspace data updated");

}

module.exports = { addDocument };
