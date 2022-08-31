import { useState } from 'react';
import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

const UploadForm = ({section, groupId, callback}) => {

  const [file, setFile] = useState();
  const [link, setLink] = useState();
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  function prepareSubmit(event) {
    event.preventDefault()
    setError(false);
    const submitButtons = Array.from(document.getElementsByClassName("submitButton"));
    submitButtons.forEach(button => button.disabled = true);
    setUploading(true);
  }

  function processResponse(response) {
    console.log(response.data);
    setUploading(false);
    setFile(null)
    const submitButtons = Array.from(document.getElementsByClassName("submitButton"));
    submitButtons.forEach(button => button.disabled = false);
    callback(false)
  }

  function processError() {
    setError(true);
    setUploading(false);
    setFile(null);
    const submitButtons = Array.from(document.getElementsByClassName("submitButton"));
    submitButtons.forEach(button => button.disabled = false);
  }

  function handleFileUpload(event, file, section) {
    prepareSubmit(event);

    if (!file) {
      processError();
      return
    }

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true
    setUploading(true);

    const url = 'http://localhost:3000/artifacts/document';
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
        processResponse(response)
      });
  }

  function handleLinkUpload(event, link, section) {
    prepareSubmit(event);
    
    if (!link) {
      processError();
      return
    }

    const url = 'http://localhost:3000/artifacts/link';
    const formData = new FormData();
    
    formData.append('link', link);
    formData.append('section', section);
    formData.append('groupId', groupId);
  
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
      <form onSubmit={(event) => handleFileUpload(event, file, section)}>
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
      <form onSubmit={(event) => handleLinkUpload(event, link, section)}>
        <h4 className="title">Add Link to External Service</h4>
        <input 
          className="urlInput" 
          type="url" 
          placeholder="https://www.example.com/"
          value={link}
          onChange={(event) => setLink(event.target.value)}
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
