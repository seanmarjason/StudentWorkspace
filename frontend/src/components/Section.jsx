import { useState, useEffect } from 'react';
import axios from 'axios';
import './Section.css'
import { UploadForm } from './UploadForm';
import { Artefact } from './Artefact';

const Section = ({ groupId, sectionName }) => {

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [artefact, setArtefact] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3000/workspaces/list/${groupId.toString()}/${sectionName}`

    axios.get(url)
      .then(response => setSectionData(response.data))
      .catch(error => console.log(`Error: ${error}`))
  }, [groupId, sectionName, showUploadForm, artefact]);

  return (
    <div className="section">
      <h3>{sectionName}</h3>
      <div className="sectionArtefacts">
        {
          sectionData.map(artefact => 
              <button
                key={`${artefact.name}`}
                className={`artefact artefact-${artefact.type}`}
                onClick={() => setArtefact(artefact)}
              >
                {artefact.name}
              </button>
          )
        }
        <button 
          className="addArtefact"
          onClick={() => setShowUploadForm(true)}
        >
          Add Artefact
        </button>
        {
        showUploadForm && 
          <UploadForm
            section={sectionName}
            groupId={groupId}
            callback={setShowUploadForm}
          />
        }
        {
        artefact &&
          <Artefact                 
            artefact={artefact}
            setArtefact={setArtefact}
            sectionName={sectionName}
          />
        }
      </div>
    </div>
  )
};

export { Section }
