import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SendRequestBtn from "../../components/SendRequestBtn";
import BackBtn from "../../components/BackBtn"
import { UserContext } from '../../contexts/user.context';
import { LogOut, ShieldCheck } from 'lucide-react';
import {
  PageContainer, 
  UserInfo, 
  UserPhoto, 
  VerifiedBadge, 
  VerifiedIcon, 
  ButtonsContainer, 
  Button, 
  DocumentsButton,
  LogoutButton,
  VerifyIdentityButton
} from './Home.style';

const Home = () => {
  const navigate = useNavigate();
  const { user, checkVerificationStatus, setProfilePicture, logout } = useContext(UserContext);

  const isAwaitingVerification = user?.isPhoneOrEmailVerified && !user?.isVerified;
  const isFullyVerified = user?.isVerified;

  useEffect(() => {
    const checkVerificationAndProfile = async () => {
      try {
        const verificationStatus = await checkVerificationStatus();
        
        // If user is verified but doesn't have a profile picture, set it
        if (verificationStatus.isVerified && (!user?.profilePicture || user.profilePicture === 'default.png')) {
          await setProfilePicture();
        }
      } catch (error) {
        console.error('Failed to check verification status:', error);
      }
    };

    checkVerificationAndProfile();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };
  
  const handleStartVerification = () => {
    navigate('/id-verification');
  };

  return (
    <PageContainer>
      <BackBtn/>
      <UserInfo>
        <UserPhoto $photoUrl={user?.profilePicture} />
        {isFullyVerified && (
          <VerifiedBadge>
            <VerifiedIcon />
          </VerifiedBadge>
        )}          
      </UserInfo>

      <ButtonsContainer>
        <Button onClick={() => handleNavigation('/profile')}>
          Profile
        </Button>
        <Button 
          onClick={() => handleNavigation('/connections')}
          disabled={!isFullyVerified}
          $disabled={!isFullyVerified}
        >
          Connections
        </Button>
      </ButtonsContainer>

      {isAwaitingVerification && (
        <VerifyIdentityButton onClick={handleStartVerification}>
          <ShieldCheck size={20} />
          Verify Your Identity
        </VerifyIdentityButton>
      )}

      <DocumentsButton onClick={() => handleNavigation('/docs')}>
        Documents
      </DocumentsButton>
     
      <SendRequestBtn 
        isHomePage={true} 
        isContactsPage={false}
        disabled={!isFullyVerified}
        $disabled={!isFullyVerified}
      />

      <LogoutButton onClick={handleLogout}>
        <LogOut size="1.5em" />
        Log out
      </LogoutButton>
      
    </PageContainer>
  );
};

export default Home;
