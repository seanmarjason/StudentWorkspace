import { useState } from 'react';
import axios from 'axios';
import './AddSection.css';

const AddSection = ({ groupId, setWorkspaceData }) => {

  const [createSection, setCreateSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  const handleCancelClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCreateSection(false);
  }

  const createNewSection = (event) => {
    event.preventDefault();
    if (!newSectionName) {
      return false
    }

    const url = `http://localhost:3000/workspaces/${groupId.toString()}/${newSectionName}`
    
    axios.post(url)
      .then(response => {
        setWorkspaceData(response.data)
        setNewSectionName('');
        setCreateSection(false)
      })
      .catch(error => console.log(`Error: ${error}`))
  }
  
  return (
    <div 
      className="addSectionContainer"
      onClick={() => setCreateSection(true)}
    >
      {
        createSection ?
        <>
          <form
            className="createSection"
            onSubmit={(e) => createNewSection(e)}
          >
            <input 
              id="newSectionNameInput"
              type="text" 
              placeholder='New Section Name'
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <button type="submit">Create</button>
            <button onClick={(e) => handleCancelClick(e)}>Cancel</button>
          </form>
        </>
        :
        <p
          className="addSection"
        >
          &#8853; Add New Section
        </p>
      }
    </div>
  )
}


export { AddSection }
