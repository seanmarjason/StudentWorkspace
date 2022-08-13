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
    const url = `http://localhost:3000/documents/list/${groupId.toString()}/${sectionName}`

    axios.get(url)
      .then(response => setSectionData(response.data.documents))
      .catch(error => console.log(`Error: ${error}`))
  }, [groupId, sectionName, showUploadForm]);

  const handleArtefactClick = (event) => {
    const artefact = JSON.parse(event.target.value);
    setArtefact(artefact)
  }

  return (
    <div className="section">
      <h3>{sectionName}</h3>
      <div className="sectionArtefacts">
        {
          sectionData.map(artefact => 
              <button
                className="artefact"
                value={JSON.stringify(artefact)}
                onClick={(event) => handleArtefactClick(event)}
              >
                {artefact}
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
            callback={setShowUploadForm}
          />
        }
        {
        artefact &&
          <Artefact                 
            artefact={artefact}
            setArtefact={setArtefact}
          />
        }
      </div>
    </div>
  )
};

export { Section }
