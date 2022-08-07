import { useState } from 'react';
import './Section.css'
import { UploadForm } from './UploadForm';

const Section = ({ sectionData }) => {

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [file, setFile] = useState();

  return (
    <div className="section">
      <h3>{sectionData.name}</h3>
      <div className="sectionArtefacts">
        {
          sectionData.artefacts.map(artefact => 
            <div className="artefact">
              <p>{artefact.title}</p>
            </div>
          )
        }
        <button 
          className="addArtefact"
          onClick={() => setShowUploadForm(true)}
        >
          Add Artefact
        </button>
      </div>
      {
        showUploadForm && 
          <UploadForm                 
            file={file} 
            setFile={setFile}  
            callback={setShowUploadForm}
          />
      }
    </div>
  )
};

export { Section }
