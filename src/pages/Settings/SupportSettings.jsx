import React from 'react';
import { HelpCircle, FileText, MessageSquare, Send } from 'lucide-react';
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

const SupportSettings = () => {
  const settingsItems = [
    { icon: <HelpCircle size="1.5em" />, text: 'FAQs' },
    { icon: <FileText size="1.5em" />, text: 'User Guide' },
    { icon: <MessageSquare size="1.5em" />, text: 'Contact Support' },
    { icon: <Send size="1.5em" />, text: 'Submit Feedback' },
  ];

  return (
    <PageContainer>
      <BackBtn />
      <Title>Help & Support</Title>
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

export default SupportSettings;