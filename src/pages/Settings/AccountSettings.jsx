import React from 'react';
import { User, XCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/BackBtn';
import {
  PageContainer,
  Title,
  SettingsList,
  SettingItem,
  SettingIcon,
  SettingText,
  ChevronIcon
} from './SettingsSharedStyles.style';

const AccountSettings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: <User size="1.5em" />, text: 'Edit Profile', color: 'inherit', onClick: () => navigate('/settings/edit-profile') },
    { icon: <XCircle size="1.5em" />, text: 'Deactivate Account', color: 'orange' },
    { icon: <Trash2 size="1.5em" />, text: 'Delete Account', color: 'red' },
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
    </PageContainer>
  );
};

export default AccountSettings;