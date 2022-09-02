import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AddSection } from '../AddSection';

describe('AddSection' , () => {
  it('should match snapshot', async () => {
    const view = render(<AddSection />)

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when user clicks', async () => {
    const view = render(<AddSection />)

    fireEvent(
      screen.getByText('⊕ Add New Section'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitFor(() => {
      screen.getByText('Create')
    });
    

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  