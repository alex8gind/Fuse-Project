import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Camera } from 'lucide-react';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  Title,
  IconWrapper,
  Message,
  PermissionMessage,
  ActionButton
} from './SelfieCheck.style';

const SelfieCheck = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
        <Title>Selfie</Title>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>
      <IconWrapper>
        <Camera size={64} color="#6366f1" />
      </IconWrapper>
      <Message>Selfie check</Message>
      <Message $small>We are going to ask you to take a selfie to prove that you're a real person</Message>
      <PermissionMessage>
        <Camera size={16} />
        This needs camera permissions
      </PermissionMessage>
      <ActionButton onClick={() => console.log('Allow camera access')}>
        Allow camera access
      </ActionButton>
    </Container>
  );
};

export default SelfieCheck;