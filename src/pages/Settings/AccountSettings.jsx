import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, XCircle, Trash2, CheckCircle } from 'lucide-react';
import BackBtn from '../../components/BackBtn';
import { UserContext } from '../../contexts/user.context';
import {
  PageContainer,
  Title,
  SettingsList,
  SettingItem,
  SettingIcon,
  SettingText,
  ChevronIcon,
  PopupOverlay,
  PopupContent,
  PopupMessage,
  PopupButtons,
  PopupButton
} from './SettingsSharedStyles.style';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, deactivateAccount, reactivateAccount, deleteAccount } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState(null);

  const handleEditProfile = () => {
    navigate('/settings/edit-profile');
  };

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount();
      // Update local user state or refetch user data
      setShowPopup(false);
    } catch (error) {
      console.error('Failed to deactivate account:', error);
      // Show error message to user
    }
  };

  const handleReactivateAccount = async () => {
    try {
      await reactivateAccount();
      // Update local user state or refetch user data
      setShowPopup(false);
    } catch (error) {
      console.error('Failed to reactivate account:', error);
      // Show error message to user
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate('/login'); // Redirect to login page after account deletion
    } catch (error) {
      console.error('Failed to delete account:', error);
      // Show error message to user
    }
  };

  const showWarning = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);  // Wrap the action in a function
    setShowPopup(true);
  };

  const settingsItems = [
    { 
      icon: <User size="1.5em" />, 
      text: 'Edit Profile', 
      color: 'inherit', 
      onClick: handleEditProfile 
    },
    { 
      icon: user?.isActive ? <XCircle size="1.5em" /> : <CheckCircle size="1.5em" />, 
      text: user?.isActive ? 'Deactivate Account' : 'Activate Account', 
      color: user?.isActive ? 'orange' : 'green',
      onClick: () => showWarning(
        user?.isActive 
          ? 'Are you sure you want to deactivate your account? You can reactivate it later.'
          : 'Are you sure you want to reactivate your account?',
        user?.isActive ? handleDeactivateAccount : handleReactivateAccount
      )
    },
    { 
      icon: <Trash2 size="1.5em" />, 
      text: 'Delete Account', 
      color: 'red',
      onClick: () => showWarning('Are you sure you want to delete your account? This action cannot be undone.', handleDeleteAccount)
    },
  ];

  return (
    <PageContainer>
      <BackBtn />
      <Title>Account Settings</Title>
      <SettingsList>
        {settingsItems.map((item, index) => (
          <SettingItem key={index} onClick={item.onClick}>
            <SettingIcon style={{color: item.color}}>{item.icon}</SettingIcon>
            <SettingText style={{color: item.color}}>{item.text}</SettingText>
            <ChevronIcon />
          </SettingItem>
        ))}
      </SettingsList>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupMessage>{popupMessage}</PopupMessage>
            <PopupButtons>
              <PopupButton onClick={() => setShowPopup(false)}>Cancel</PopupButton>
              <PopupButton onClick={popupAction}>Proceed</PopupButton>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}
    </PageContainer>
  );
};

export default AccountSettings;