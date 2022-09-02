import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Section } from '../Section';

const sectionWithNoDocuments = {
  data: []
}

const sectionWithDocuments = {
  data: [
      { name: 'doc 1', type: 'file', url: ''},
      { name: 'doc 2', type: 'file', url: ''},
      { name: 'link 1', type: 'link', url: ''},
  ]
}

jest.mock('axios');

jest.mock('../UploadForm', () => ({
  UploadForm: () => <div className="uploadForm">UploadForm</div>
  }
));

jest.mock('../Artefact', () => ({
  Artefact: () => <div className="artefact"><h3>Artifact</h3></div>
  }
));

describe('Section' , () => {
  afterEach(() =>
    jest.clearAllMocks()
  )

  it('should match snapshot with no documents', async () => {
    axios.get.mockResolvedValueOnce(sectionWithNoDocuments);

    const view = render(<Section groupId={'100'} sectionName="deliverables" />)

    await waitFor(() => {
      screen.getByText('deliverables')
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should match snapshot with documents', async () => {
    axios.get.mockResolvedValueOnce(sectionWithDocuments);

    const view = render(<Section groupId={'100'} sectionName="deliverables" />)

    await waitFor(() => {
      screen.getByText('doc 1')
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when user clicks an artifact', async () => {
    axios.get.mockResolvedValue(sectionWithDocuments);

    const view = render(<Section groupId={'100'} sectionName="deliverables" />)

    await waitFor(() => {
      screen.getByText('doc 1')
    });

    fireEvent(
      screen.getByText('doc 1'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitFor(() => {
      screen.getByText('Artifact')
    });
    
    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when user tries to add artifact', async () => {
    axios.get.mockResolvedValue(sectionWithDocuments);

    const view = render(<Section groupId={'100'} sectionName="deliverables" />)

    await waitFor(() => {
      screen.getByText('Add Artefact')
    });

    fireEvent(
      screen.getByText('Add Artefact'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    await waitFor(() => {
      screen.getByText('UploadForm')
    });
    
    expect(view.asFragment()).toMatchSnapshot();
  });
  
})
  