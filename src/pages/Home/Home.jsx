import React from 'react';
import { PageContainer, UserInfo, UserPhoto, VerifiedBadge, VerifiedIcon, ButtonsContainer, Button, ConnectionRequestButton, DocumentsButton } from './Home.style';
import BackBtn from "../../components/BackBtn"

const Home = () => {
  return (
    <PageContainer>
      <BackBtn/>
      <UserInfo>
        <UserPhoto />
        <VerifiedBadge>
          <VerifiedIcon />
        </VerifiedBadge>       
      </UserInfo>

      <ButtonsContainer>
        <Button>Profile</Button>
        <Button>Connections</Button>
      </ButtonsContainer>

      <DocumentsButton>Documents</DocumentsButton>
      <ConnectionRequestButton>Send Connection Request</ConnectionRequestButton>
      
    </PageContainer>
  );
};

export default Home;
