import axios from 'axios';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './Artefact.css';

const handleDownloadClick = async (sectionName, filename) => {
  const url = `http://localhost:3000/artifacts/documents/download/${sectionName}/${filename}`;

  axios({
    url,
    method: 'GET',
    responseType: 'blob',
    // responseType: 'stream' // TODO: Handle response as stream to download bigger files
  })
    .then(response => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => console.log(`Error: ${error}`))
}


const handleDeleteClick = (sectionName, artefact, callback) => {
  console.log(`Trying to delete ${artefact} from ${sectionName}.`)
  const url = `http://localhost:3000/artifacts/documents/delete/${sectionName}/${artefact}`;

  axios.delete(url)
    .then(response => {
      console.log(response.data);
      callback(false)
    })
    .catch(error => console.log(`Error: ${error}`))
}

const Artefact = ({ artefact, setArtefact, sectionName }) => {

  const handleClickOutside = () => {
    setArtefact(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="artefactOverlay">
      <p>Workspace Artefact</p>
      <p>for artefact: {artefact}</p>
      <span className="closeButton" onClick={() => setArtefact(null)}>&#x2715;</span>
      <div className="button-container">
        <button
          onClick={() =>handleDownloadClick(sectionName, artefact)}
        >
          Download
        </button>
        <button
          onClick={() => handleDeleteClick(sectionName, artefact, setArtefact)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export { Artefact };
