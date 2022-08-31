import { useState } from 'react';
import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

const UploadForm = ({section, groupId, callback}) => {

  const [file, setFile] = useState();
  const [link, setLink] = useState();
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  function setSubmitButtons(state) {
    const submitButtons = Array.from(document.getElementsByClassName("submitButton"));
    submitButtons.forEach(button => button.disabled = state);
  }

  function prepareSubmit(event) {
    event.preventDefault()
    setError(false);
    setSubmitButtons(true)
    setUploading(true);
  }

  function processResponse(response) {
    console.log(response.data);
    setUploading(false);
    setFile(null);
    setSubmitButtons(false);
    callback(false);
  }

  function processError() {
    setError(true);
    setUploading(false);
    setFile(null);
    setSubmitButtons(false);
  }

  function handleUpload(event, artefact, type, section) {
    prepareSubmit(event);

    if (!artefact) {
      processError();
      return
    }

    const url = `http://localhost:3000/artifacts/add/${type}`;
    const formData = new FormData();
    formData.append('section', section);
    formData.append('groupId', groupId);
    
    if (type === 'document') {
      formData.append('file', artefact);
      formData.append('fileName', artefact.name);
    }
    if (type === 'link') {
      formData.append('linkName', artefact.name.value);
      formData.append('linkUrl', artefact.url.value);
    }
  
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
  
    axios.post(url, formData, config)
      .then((response) => {
        processResponse(response)
      });
  }

  const handleClickOutside = () => {
    callback(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="form uploadForm">
      <span className="closeButton" onClick={() => callback(false)}>&#x2715;</span>
      <form onSubmit={(event) => handleUpload(event, file, 'document', section)}>
        <h4 className="title">File Upload</h4>
        <div className="button-container">
          <input 
            type="file" 
            onChange={(event) => setFile(event.target.files[0])}
          />
          <button className="submitButton" type="submit">Upload</button>
        </div>
      </form>
      <p className="separator">-- OR --</p>
      <form onSubmit={(event) => handleUpload(event, event.target, 'link', section)}>
        <h4 className="title">Add Link to External Service</h4>
        <input 
          className="urlInput" 
          type="string" 
          placeholder="My Link Name"
          name="name"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          required
        />
        <input 
          className="urlInput" 
          type="url" 
          placeholder="https://www.example.com/"
          name="url"
          required
        />
        <button className="submitButton" type="submit">Upload</button>
      </form>
      <hr></hr>
      <div className="uploadingStatus">
      { uploading && <p>Uploading ...</p> }
      { error && <p>Error uploading. Please try again.</p> }
      </div>
    </div>
    )
  };

export { UploadForm }
