import {render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Workspace } from '../Workspace';

const workspace = {
  data: {
    "group_id": "100",
    "name": "Test Workspace 1",
    "groupReference": "Group ABC",
    "groupMembers": [],
    "sections": [
      "research",
      "deliverables"
    ]
  }
}

jest.mock('axios');

jest.mock('../Section', () => ({
  Section: () => <div className="section" />
  }
));

describe('Workspace' , () => {
  it('should match snapshot', async () => {
    axios.get.mockResolvedValueOnce(workspace);

    const view = render(<Workspace groupId={'100'} />)

    await waitFor(() => {
      screen.getByText('Test Workspace 1')
    });

    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  