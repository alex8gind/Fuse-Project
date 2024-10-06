import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Lock, HelpCircle, LogOut, Trash2, ChevronRight } from 'lucide-react';
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
} from './Settings.style';

const Settings = () => {
  const navigate = useNavigate();
  const { logout, deleteAccount } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState(null);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const showWarning = (message, action) => {
    setPopupMessage(message);
    setPopupAction(() => action);
    setShowPopup(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Show error message to user
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account:', error);
      // Show error message to user
    }
  };

  const settingsItems = [
    { icon: <User size="1.5em" />, text: 'Account', path: '/settings/account' },
    { icon: <Bell size="1.5em" />, text: 'Notifications', path: '/settings/notifications' },
    { icon: <Lock size="1.5em" />, text: 'Privacy and Security', path: '/settings/privacy' },
    { icon: <HelpCircle size="1.5em" />, text: 'Help and Support', path: '/settings/help' },
    { 
      icon: <LogOut size="1.5em" />, 
      text: 'Log out', 
      action: () => showWarning('Are you sure you want to log out?', handleLogout)
    },
    { 
      icon: <Trash2 size="1.5em" />, 
      text: 'Delete Account', 
      action: () => showWarning('Are you sure you want to delete your account? This action cannot be undone.', handleDeleteAccount)
    },
  ];

  return (
    <PageContainer>
      <BackBtn />
      <Title>Settings</Title>
      <SettingsList>
        {settingsItems.map((item, index) => (
          <SettingItem 
            key={index} 
            onClick={item.action ? item.action : () => handleNavigation(item.path)}
          >
            <SettingIcon>{item.icon}</SettingIcon>
            <SettingText>{item.text}</SettingText>
            <ChevronIcon><ChevronRight size="1.5em" /></ChevronIcon>
          </SettingItem>
        ))}
      </SettingsList>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupMessage>{popupMessage}</PopupMessage>
            <PopupButtons>
              <PopupButton onClick={() => setShowPopup(false)}>Cancel</PopupButton>
              <PopupButton onClick={() => {
                setShowPopup(false);
                popupAction();
              }}>Proceed</PopupButton>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}
    </PageContainer>
  );
};

export default Settings;