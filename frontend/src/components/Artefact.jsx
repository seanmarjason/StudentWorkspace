import { useOutsideClick } from '../hooks/useOutsideClick';
import './Artefact.css';

const Artefact = ({ artefact, setArtefact }) => {

  const handleClickOutside = () => {
    setArtefact(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="artefactOverlay">
      <p>Workspace Artefact</p>
      <p>for artefact: {artefact}</p>
      <span className="closeButton" onClick={() => setArtefact(null)}>&#x2715;</span>
    </div>
  )
}

export { Artefact };
