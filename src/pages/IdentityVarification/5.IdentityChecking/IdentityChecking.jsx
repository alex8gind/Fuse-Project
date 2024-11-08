import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Mail } from 'lucide-react';
import {
  Container,
  Header,
  IconButton,
  Content,
  MessageContainer,
  Heading,
  Description,
  NotificationBox,
  NotificationText,
  Title,
  IconWrapper
} from './IdentityChecking.style';

const IdentityVerification = ({ onBack, onClose }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/'); // Navigate to home page as default behavior
    }
  };

  return (
    <Container>
      <Header>
        <IconButton onClick={handleBack}>
          <ChevronLeft size={18} />
        </IconButton>
        <Title>ID Verification</Title>
        <IconButton onClick={handleClose}>
          <X size={18} />
        </IconButton>
      </Header>

      <Content>
        <IconWrapper>
          <Mail size={28} />
        </IconWrapper>

        <MessageContainer>
          <Heading>Verification In Progress</Heading>
          <Description>
            We are currently processing your identity verification request.
          </Description>
        </MessageContainer>

        <NotificationBox>
          <NotificationText>
            You will receive a confirmation email once your identity verification is complete. 
            This process typically takes 24-48 hours.
          </NotificationText>
          <NotificationText>
            You can safely close this window.
          </NotificationText>
        </NotificationBox>
      </Content>
    </Container>
  );
};

export default IdentityVerification;