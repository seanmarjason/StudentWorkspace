import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './UploadForm.css';

function handleFileChange(event, setFile) {
  setFile(event.target.files[0]);
}

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
}

const UploadForm = ({file, setFile, section, callback}) => {

  const handleClickOutside = () => {
    callback(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="form uploadForm">
      <form onSubmit={(event) => handleUploadSubmit(event, file, section)}>
        <div className="title">File Upload</div>
        <div className="button-container">
          <input type="file" onChange={(event) => handleFileChange(event, setFile)}/>
          <button type="submit">Upload</button>
          <button onClick={() => callback(false)}>Cancel</button>
          <span className="closeButton" onClick={() => callback(false)}>&#x2715;</span>
        </div>
      </form>
      <hr></hr>
    </div>
    )
  };

export { UploadForm }
