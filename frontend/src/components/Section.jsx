import { useState } from 'react';
import './Section.css'
import { UploadForm } from './UploadForm';
import { Artefact } from './Artefact';

const Section = ({ sectionName, sectionData }) => {

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [file, setFile] = useState();
  const [artefact, setArtefact] = useState(null);

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
                {artefact.title}
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
            file={file} 
            setFile={setFile}  
            section={sectionName}
            callback={setShowUploadForm}
          />
        }
        {
        artefact &&
          <Artefact                 
            artefact={artefact}
            callback={setArtefact}
          />
        }
      </div>
    </div>
  )
};

export { Section }
