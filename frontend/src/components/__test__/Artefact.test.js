import {render } from '@testing-library/react';
import { Artefact } from '../Artefact';

describe('Artefact' , () => {
  it('should match snapshot for file artefacts', async () => {
    const artefact = {
      "type": "file",
      "name": "name.txt",
      "url": "./uploads/name.txt"
    }

    const setArtefact = jest.fn();

    const sectionName = 'test'

    const view = render(
      <Artefact 
        artefact={artefact} 
        setArtefact={setArtefact} 
        sectionName={sectionName}
      />
    )

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  