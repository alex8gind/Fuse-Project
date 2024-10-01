import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Lock, HelpCircle, LogOut, Trash2, ChevronRight  } from 'lucide-react';
import BackBtn from '../../components/BackBtn';
import { 
  PageContainer, 
  Title,
  SettingsList, 
  SettingItem, 
  SettingIcon, 
  SettingText,
  ChevronIcon } from './Settings.style';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic here
    console.log('Deleting account...');
  };

  const settingsItems = [
    { icon: <User size="1.5em" />, text: 'Account', path: '/settings/account' },
    { icon: <Bell size="1.5em" />, text: 'Notifications', path: '/settings/notifications' },
    { icon: <Lock size="1.5em" />, text: 'Privacy and Security', path: '/settings/privacy' },
    { icon: <HelpCircle size="1.5em" />, text: 'Help and Support', path: '/settings/help' },
    { icon: <LogOut size="1.5em" />, text: 'Log out', action: handleLogout },
    { icon: <Trash2 size="1.5em" />, text: 'Delete Account', action: handleDeleteAccount },
  ];


  return (
    <PageContainer>
      <BackBtn />
      <Title>Settings</Title>
      <SettingsList>
        {settingsItems.map((item, index) => (
          <SettingItem 
          key={index} 
          onClick={item.action ? item.action : () => navigate(item.path)}
          >
            <SettingIcon>{item.icon}</SettingIcon>
            <SettingText>{item.text}</SettingText>
            <ChevronIcon><ChevronRight size="1.5em" /></ChevronIcon>
          </SettingItem>
        ))}
      </SettingsList>
    </PageContainer>
  );
};

export default Settings;