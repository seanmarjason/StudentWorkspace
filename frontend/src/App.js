import './App.css';
import {useState} from 'react';
import { LoginForm } from './components/LoginForm';
import { LogoutForm } from './components/LogoutForm';
import { Workspace } from './components/Workspace';

function App() {
  //states to support login
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [groupId, setGroupId] = useState(false);
  
  return (
    <div className="app">
        {
          isLoginSuccess 
          ? 
            <>
              <Workspace groupId={groupId}/>
              <LogoutForm setIsLoginSuccess={setIsLoginSuccess} />
            </>
          : <LoginForm setIsLoginSuccess={setIsLoginSuccess} setGroupId={setGroupId} />
        }
    </div>
  );
}

export default App;
