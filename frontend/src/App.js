import './App.css';
import {useState} from 'react';
import { LoginForm } from './components/LoginForm';
import { LogoutForm } from './components/LogoutForm';
// import { UploadForm } from './components/UploadForm';
import { Workspace } from './components/Workspace';

function App() {
  //states to support login
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  //state to support file transfer
  // const [file, setFile] = useState();

  const testWorkspace = {
    id: 'testWorkspace',
    name: 'Test Workspace',
    groupReference: 'Group ABC',
    groupMembers: [],
    sections: [
      { 
        name: 'research',
        artefacts: [
          { title: 'doc1', type: 'document', link: ''}, 
          { title: 'doc2', type: 'document', link: ''}, 
        ] 
      },
      { 
        name: 'deliverables',
        artefacts: [
          { title: 'doc1', type: 'document', link: ''}, 
          { title: 'doc2', type: 'document', link: ''}, 
        ] 
      },
    ]
  }

  return (
    <div className="app">
        {
          isLoginSuccess 
          ? 
            <>
              {/* <UploadForm  
                file={file} 
                setFile={setFile} 
                /> */}
              <Workspace workspaceData={testWorkspace}/>
              <LogoutForm callback={setIsLoginSuccess} />
            </>
          : <LoginForm callback={setIsLoginSuccess} />
        }
    </div>
  );
}

export default App;
