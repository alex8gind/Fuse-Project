import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SendRequestBtn from "../../components/SendRequestBtn";
import BackBtn from "../../components/BackBtn"
import { UserContext } from '../../contexts/user.context';
import { LogOut } from 'lucide-react';
import { PageContainer, 
  UserInfo, 
  UserPhoto, 
  VerifiedBadge, 
  VerifiedIcon, 
  ButtonsContainer, 
  Button, 
  DocumentsButton,
  LogoutButton
} from './Home.style';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <PageContainer>
      <BackBtn/>
      <UserInfo>
        <UserPhoto $photoUrl={user?.profilePicture} />
        <VerifiedBadge>
          <VerifiedIcon />
        </VerifiedBadge>       
      </UserInfo>

       <ButtonsContainer>
        <Button onClick={() => handleNavigation('/profile')}>Profile</Button>
        <Button onClick={() => handleNavigation('/connections')}>Connections</Button>
      </ButtonsContainer>

      <DocumentsButton onClick={() => handleNavigation('/docs')}>Documents</DocumentsButton>
     
      <SendRequestBtn isHomePage={true} isContactsPage={false} />

      <LogoutButton onClick={handleLogout}>
        <LogOut size="1.5em" />
        Log out
      </LogoutButton>
      
    </PageContainer>
  );
};

export default Home;
