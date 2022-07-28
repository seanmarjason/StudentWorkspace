// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
// import Button from '@mui/material/Button';

function App() {
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3001/documents/upload';
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('fileName', file.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  
      <form onSubmit={handleSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>

          {/* <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleChange}/>
          </Button>

          <Button variant="contained" component="label">
            Submit
            <button type="submit" hidden></button>
          </Button> */}
        </form>
    </div>
  );
}

export default App;
