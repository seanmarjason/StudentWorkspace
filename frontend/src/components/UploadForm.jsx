import { useState } from 'react';
import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

const UploadForm = ({section, groupId, callback}) => {

  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleUploadSubmit(event, file, section) {
    event.preventDefault()
    setError(false);

    if (!file) {
      setError(true)
      return
    }

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true
    setUploading(true);

    const url = 'http://localhost:3000/artifacts/documents/upload';
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('section', section);
    formData.append('groupId', groupId);
  
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
  
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setFile(null)
        submitButton.disabled = false;
        setUploading(false);
        callback(false)
      });
  }

  const handleClickOutside = () => {
    callback(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="form uploadForm">
      <form onSubmit={(event) => handleUploadSubmit(event, file, section)}>
        <div className="title">File Upload</div>
        <div className="button-container">
          <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
          <button id="submitButton" type="submit">Upload</button>
        </div>
        <span className="closeButton" onClick={() => callback(false)}>&#x2715;</span>
      </form>
      <hr></hr>
      <div className="uploadingStatus">
      { uploading && <p>Uploading ...</p> }
      { error && <p>Error uploading document. Please try again.</p> }
      </div>
    </div>
    )
  };

export { UploadForm }
