import { useState, useEffect } from 'react';
import axios from 'axios';
import './Workspace.css';
import { Section } from './Section';
import { AddSection } from './AddSection';

const Workspace = ({ groupId }) => {

  const [workspaceData, setWorkspaceData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3000/workspaces/${groupId.toString()}`

    axios.get(url)
      .then(response => setWorkspaceData(response.data))
      .catch(error => console.log(`Error: ${error}`))
  }, [groupId]);

  const moveSection = (sectionName, direction) => {
    const url = `http://localhost:3000/workspaces/${groupId.toString()}/${sectionName}/${direction}`
    
    axios.patch(url)
      .then(response => setWorkspaceData(response.data))
      .catch(error => console.log(`Error: ${error}`))
  }

  return (
    <div className="workspace">
      {
        workspaceData ?
          <>
            <h1>{workspaceData.name}</h1>
            <h2>{workspaceData.groupReference}</h2>
            <div className="workspaceSections">
              {
                workspaceData.sections.map((section) =>
                  <div className="sectionContainer" id={section.name} key={section.name}>
                    <Section
                      groupId={groupId}
                      sectionName={section.name}
                    />
                    <div className="moveButtons">
                      <span onClick={() => moveSection(section.name, 'up')}>&#8593;</span>
                      <br />
                      <br />
                      <span onClick={() => moveSection(section.name, 'down')}>&#8595;</span>
                    </div>
                  </div>
                )
              }
            </div>
          <AddSection 
            groupId={groupId}
            setWorkspaceData={setWorkspaceData}
          />
          </>
          :
          <p>Loading...</p>
        }
        <div className="footer"></div>
        </div>
  )
}


export { Workspace }
