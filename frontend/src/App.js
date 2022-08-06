// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { LoginForm } from './components/LoginForm';
import { LogoutForm } from './components/LogoutForm';
import { UploadForm } from './components/UploadForm'

function App() {
  //states to support login
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  //state to support file transfer
  const [file, setFile] = useState();

  return (
    <div className="app">
      <div className="login-form">
        {
          isLoginSuccess 
          ? 
            <>
              <UploadForm  
                file={file} 
                setFile={setFile} 
                />
              <LogoutForm callback={setIsLoginSuccess} />
            </>
          : <LoginForm callback={setIsLoginSuccess} />
        }
      </div>
    </div>
  );
}

export default App;
