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
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:3001/users/login';
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

  // File upload form handler
  function handleUploadSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3001/documents/upload';
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
        <div className="button-container">
          <input type="file" onChange={handleFileChange}/>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isLoginSuccess ? <div>User is successfully logged in</div> : renderLoginForm}
      </div>
    </div>
  );

  // return (
  //   <div className="app">
  //     <div className="login-form">
  //       <div className="title">File Upload</div>
  //       {renderUploadForm}
  //     </div>
  //   </div>
  // );

}

export default App;
