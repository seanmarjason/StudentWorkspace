import { useOutsideClick } from '../hooks/useOutsideClick';
import './Artefact.css';

const Artefact = ({ artefact, callback }) => {

  const handleClickOutside = () => {
    callback(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div ref={ref} className="artefactOverlay">
      <p>Workspace Artefact</p>
      <p>for artefact: {artefact}</p>
      <span className="closeButton" onClick={() => callback(null)}>&#x2715;</span>
    </div>
  )
}

export { Artefact };
