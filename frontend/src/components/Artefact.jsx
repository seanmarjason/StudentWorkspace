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


const handleDeleteClick = (sectionName, artefact, type, callback) => {
  console.log(`Trying to delete ${artefact} from ${sectionName}.`)
  const url = `http://localhost:3000/artifacts/delete/${type}/${sectionName}/${artefact}`;

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
    <div ref={ref} className={`artefactOverlay artefactOverlay-${artefact.type}`}>
      <h4>{`Workspace ${artefact.type}`}</h4>
      <span className="closeButton" onClick={() => setArtefact(null)}>&#x2715;</span>

      { artefact.type === 'file' && 
        <>
          <p>{artefact.name}</p>
          <div className="button-container">
            <button
              onClick={() =>handleDownloadClick(sectionName, artefact.name)}
              className="download"
              >
              Download
            </button>
            <button
              onClick={() => handleDeleteClick(sectionName, artefact.name, 'document', setArtefact)}
              className="delete"
              >
              Delete
            </button>
          </div>
        </>
      }

      { artefact.type === 'link' && 
        <>
          <p>{artefact.name}</p>
          <p><i>{artefact.url}</i></p>
          <div className="button-container">
            <a
              href={`${artefact.url}`}
              target="_blank" 
              rel="noreferrer"
              className="open"
            >
              Go to service
            </a>
            <button
              onClick={() => handleDeleteClick(sectionName, artefact, 'link', setArtefact)}
              className="delete"
            >
              Delete
            </button>
          </div>
        </>
      }

    </div>
  )
}

export { Artefact };
