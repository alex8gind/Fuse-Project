import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, X } from 'lucide-react';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  Title,
  IconWrapper,
  Message,
  ActionButton
} from './VerificationSuccess.style';

const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
        <Title>Selfie</Title>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>
      <IconWrapper>
        <Check size={64} color="#4CAF50" />
      </IconWrapper>
      <Message>You were successfully verified</Message>
      <Message $small>Press "Finish" to continue</Message>
      <ActionButton onClick={() => navigate('/next-step')}>
        Allow camera access
      </ActionButton>
    </Container>
  );
};

export default VerificationSuccess;