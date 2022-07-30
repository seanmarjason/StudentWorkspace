// import logo from './logo.svg';
// import Button from '@mui/material/Button';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  //states to support login
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  //state to support file transfer
  const [file, setFile] = useState();

  function handleFileChange(event) {
    setFile(event.target.files[0]);

  }
  
  // Login form handler
  function handleLoginSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/users/login';
    var { username, password } = document.forms[0];
    const formData = new FormData();
    
    formData.append('username', username.value);
    formData.append('password', password.value);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(url, formData, config)
      .then((response) => {
        if (response.status === 200 && response.data === 'Login successful!') {
          console.log('Login successful!');
          setIsLoginSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });

  }

    // Logout form handler
    function handleLogoutSubmit(event) {
      event.preventDefault()
      const url = 'http://localhost:3000/users/logout';
  
      axios.delete(url)
      .then((response) => {
        if (response.status === 200 && response.data === 'Logout successful!') {
          console.log('Logout successful!');
          setIsLoginSuccess(false);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });
        
    }

  // File upload form handler
  function handleUploadSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/documents/upload';
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('fileName', file.name);

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

  // Generate JSX code for error message
  const renderErrorMessage = (name) => {
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  }

  // Login form
  const renderLoginForm = (
    <div className="form">
      <form onSubmit={handleLoginSubmit}>
        <div className="title">Login</div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
          {renderErrorMessage("username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );

  const renderUploadForm = (
    <div className="form">
      <form onSubmit={handleUploadSubmit}>
        <div className="title">File Upload</div>
        <div className="button-container">
          <input type="file" onChange={handleFileChange}/>
          <button type="submit">Upload</button>
        </div>
      </form>
      <hr></hr>
      <form onSubmit={handleLogoutSubmit}>
        <div className="button-container">
          <button type="submit">Logout</button>
        </div>
      </form>      
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isLoginSuccess ? renderUploadForm : renderLoginForm}
      </div>
    </div>
  );

}

export default App;
