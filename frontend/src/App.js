import './App.css';
import {useState} from 'react';
import { LoginForm } from './components/LoginForm';
import { LogoutForm } from './components/LogoutForm';
import { Workspace } from './components/Workspace';

function App() {
  //states to support login
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  
  const group_id = 100; // TODO: Remove hardcoded group_id

  return (
    <div className="app">
        {
          isLoginSuccess 
          ? 
            <>
              <Workspace groupId={group_id}/>
              <LogoutForm callback={setIsLoginSuccess} />
            </>
          : <LoginForm callback={setIsLoginSuccess} />
        }
    </div>
  );
}

export default App;
