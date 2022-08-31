import { useState } from 'react';
import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

const UploadForm = ({section, groupId, callback}) => {

  const [file, setFile] = useState();
  const [link, setLink] = useState();
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

  function handleLinkSubmit(event, link, section) {
    event.preventDefault();
    console.log(link);
  }

  const handleClickOutside = () => {
    callback(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="form uploadForm">
      <span className="closeButton" onClick={() => callback(false)}>&#x2715;</span>
      <form onSubmit={(event) => handleUploadSubmit(event, file, section)}>
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
      <form onSubmit={(event) => handleLinkSubmit(event, link, section)}>
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
      { error && <p>Error uploading document. Please try again.</p> }
      </div>
    </div>
    )
  };

export { UploadForm }
