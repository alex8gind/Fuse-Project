import React from 'react';
import { Shield, Eye, Key, UserX } from 'lucide-react';
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

const PrivacySecurity = () => {
  const settingsItems = [
    { icon: <Shield size="1.5em" />, text: 'Privacy Settings' },
    { icon: <Eye size="1.5em" />, text: 'Visibility Controls' },
    { icon: <Key size="1.5em" />, text: 'Two-Factor Authentication' },
    { icon: <UserX size="1.5em" />, text: 'Blocked Users' },
  ];

  return (
    <PageContainer>
      <BackBtn />
      <Title>Privacy & Security</Title>
      <SettingsList>
        {settingsItems.map((item, index) => (
          <SettingItem key={index}>
            <SettingIcon>{item.icon}</SettingIcon>
            <SettingText>{item.text}</SettingText>
            <ChevronIcon />
          </SettingItem>
        ))}
      </SettingsList>
    </PageContainer>
  );
};

export default PrivacySecurity;