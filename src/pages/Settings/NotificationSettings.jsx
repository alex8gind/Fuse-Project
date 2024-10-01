import React, {useState} from 'react';
import { Bell, MessageCircle, Mail, Calendar } from 'lucide-react';
import BackBtn from '../../components/BackBtn';
import {
  PageContainer,
  Title,
  SettingsList,
  SettingItem,
  SettingIcon,
  SettingText,
  SwitchWrapper
} from './SettingsSharedStyles.style';
import styled from 'styled-components';

// Simple Switch component
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: ${props => props.theme.colors.primaryOrange};
  }

  ${SwitchInput}:checked + &:before {
    transform: translateX(26px);
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Switch = ({ checked, onChange }) => (
  <SwitchLabel>
    <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
    <SwitchSlider />
  </SwitchLabel>
);

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: false,
    inAppNotifications: false,
    emailNotifications: false,
    eventReminders: false,
  });

  const settingsItems = [
    { key: 'pushNotifications', icon: <Bell size="1.5em" />, text: 'Push Notifications' },
    { key: 'inAppNotifications', icon: <MessageCircle size="1.5em" />, text: 'In-App Notifications' },
    { key: 'emailNotifications', icon: <Mail size="1.5em" />, text: 'Email Notifications' }
    
  ];

  const handleToggle = (key) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key]
    }));
  };

  return (
    <PageContainer>
      <BackBtn />
      <Title>Notification Settings</Title>
      <SettingsList>
        {settingsItems.map((item) => (
          <SettingItem key={item.key}>
            <SettingIcon>{item.icon}</SettingIcon>
            <SettingText>{item.text}</SettingText>
            <SwitchWrapper>
              <Switch 
                checked={settings[item.key]} 
                onChange={() => handleToggle(item.key)}
              />
            </SwitchWrapper>
          </SettingItem>
        ))}
      </SettingsList>
    </PageContainer>
  );
};

export default NotificationSettings;