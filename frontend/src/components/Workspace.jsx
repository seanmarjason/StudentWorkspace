import './Workspace.css'
import { Section } from './Section'

const Workspace = ({ workspaceData }) => (
  <div className="workspace">
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
  </div>
);

export { Workspace }
