import React from 'react';
import SendRequestBtn from "../../components/SendRequestBtn"
import { PageContainer, 
  UserInfo, 
  UserPhoto, 
  VerifiedBadge, 
  VerifiedIcon, 
  ButtonsContainer, 
  Button, 
  DocumentsButton 
} from './Home.style';
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
      <SendRequestBtn isContactsPage={false} />
      
    </PageContainer>
  );
};

export default Home;
