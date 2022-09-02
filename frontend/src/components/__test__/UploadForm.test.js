import {render } from '@testing-library/react';
import { UploadForm } from '../UploadForm';

describe('Upload Form' , () => {
  it('should match snapshot', async () => {
    const view = render(<UploadForm />)

    expect(view.asFragment()).toMatchSnapshot();
  });
})
  