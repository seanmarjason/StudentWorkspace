import {useState} from 'react';
import axios from 'axios';

// Generate JSX code for error message
const ErrorMessage = (name, errors) => {
  name === errors.name && (
    <div className="error">{errors.message}</div>
  );
}

// Login form handler
const handleLoginSubmit = (event, callback) => {
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
        callback(true);
      }
    })
    .catch((error) => {
      console.log(error.response.status);
    });
}


const LoginForm = ({ callback }) => {
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState({});

  return (
    <div className="form">
      <form onSubmit={(event) => handleLoginSubmit(event, callback)}>
        <div className="title">Login</div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
          <ErrorMessage name="username" errors={errorMessages} />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          <ErrorMessage name="password" errors={errorMessages} />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export { LoginForm };