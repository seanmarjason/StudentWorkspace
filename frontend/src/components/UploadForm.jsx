import { useState } from 'react';
import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

const UploadForm = ({section, callback}) => {

  const [file, setFile] = useState();

  function handleUploadSubmit(event, file, section) {
    event.preventDefault()
    const url = 'http://localhost:3000/documents/upload';
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('section', section);
  
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
  
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
      });

    setFile(null)
    callback(false)
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
          <button type="submit">Upload</button>
          <span className="closeButton" onClick={() => callback(false)}>&#x2715;</span>
        </div>
      </form>
      <hr></hr>
    </div>
    )
  };

export { UploadForm }
