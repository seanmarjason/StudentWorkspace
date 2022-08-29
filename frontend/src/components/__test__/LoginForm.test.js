import {render } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

describe('Login Form' , () => {
  it('should match snapshot', async () => {
    const view = render(<LoginForm />)

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  