import { useState, useEffect } from 'react';
import axios from 'axios';
import './Workspace.css';
import { Section } from './Section';

const Workspace = ({ workspaceId }) => {

  const [workspaceData, setWorkspaceData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3000/workspaces/${workspaceId}`

    axios.get(url)
      .then(response => setWorkspaceData(response.data))
      .catch(error => console.log(`Error: ${error}`))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="workspace">
      {
        workspaceData ?
          <>
            <h1>{workspaceData.name}</h1>
            <h2>{workspaceData.groupReference}</h2>
            <div className="workspaceSections">
              { 
                workspaceData.sections.map(section => 
                  <Section 
                    sectionData={section}
                  />
                )
              }
            </div>
          </>
          :
          <p>Loading...</p>
        };
        </div>
  )
}


export { Workspace }
