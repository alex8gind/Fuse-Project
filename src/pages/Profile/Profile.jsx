import React from 'react';
import { PageContainer, UserInfo, UserPhoto, VerifiedBadge, VerifiedIcon, ButtonsContainer, Button, ConnectionRequestButton, DocumentsButton } from './Profile.style';



const UserPage = () => {
  return (
    <PageContainer>

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

export default UserPage;


