import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileSignature, Stethoscope } from 'lucide-react';
import BackBtn from '../../components/BackBtn.jsx';
import {
  PageContainer,
  Title,
  ButtonsContainer,
  DocumentButton
} from './Docs.style.jsx';

const MyDocs = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
  
        <BackBtn/>
        <Title>My Documents</Title>
   
      <ButtonsContainer>
        <DocumentButton onClick={() => navigate('/docs/uploader')}>
          <Stethoscope />
          Medical documents
        </DocumentButton>
        <DocumentButton onClick={() => navigate('/agreements')}>
          <FileText />
          Agreements
        </DocumentButton>
        <DocumentButton onClick={() => navigate('/digital-signature')}>
          <FileSignature />
          My Digital signature
        </DocumentButton>
      </ButtonsContainer>
    </PageContainer>
  );
};

export default MyDocs;