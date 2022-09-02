import {render } from '@testing-library/react';
import { LogoutForm } from '../LogoutForm';

describe('Logout Form' , () => {
  it('should match snapshot', async () => {
    const view = render(<LogoutForm />)

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  