import {render } from '@testing-library/react';
import { Artefact } from '../Artefact';

describe('Artefact' , () => {
  it('should match snapshot', async () => {
    const view = render(<Artefact />)

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  