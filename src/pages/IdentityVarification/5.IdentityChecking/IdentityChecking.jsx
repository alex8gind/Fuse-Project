import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, CreditCard } from 'lucide-react';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  Title,
  IconWrapper,
  Message,
  ProgressBar,
  ProgressText
} from './IdentityChecking.style';

const IdentityChecking = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
        <Title>ID Information</Title>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>
      <IconWrapper>
        <CreditCard size={64} color="#6366f1" />
      </IconWrapper>
      <Message>Checking your identity</Message>
      <Message $small>Please keep this page open</Message>
      <ProgressBar />
      <ProgressText>Uploading ID</ProgressText>
    </Container>
  );
};

export default IdentityChecking;