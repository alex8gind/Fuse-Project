import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useUserContext } from '../../contexts/user.context'; 
import {
  Container,
  CardContainer,
  IconWrapper,
  Title,
  Message,
  CloseButton
} from './VerificationResult.style';

const VerificationResult = () => {
const { token } = useParams();
const navigate = useNavigate();
const { verifyEmail } = useUserContext();
const [verificationStatus, setVerificationStatus] = useState('pending');

useEffect(() => {
  const verifyToken = async () => {
    if (!token) {
      setVerificationStatus('failed');
      return;
    }

    try {
      await verifyEmail(token);
      setVerificationStatus('success');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationStatus('failed');
    }
  };

  verifyToken();
}, [token, verifyEmail]);


useEffect(() => {
  if (verificationStatus === 'success') {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [verificationStatus, navigate]);

const onClose = () => {
  navigate(verificationStatus === 'success' ? '/login' : '/register');
};

if (verificationStatus === 'pending') {
  return (
    <Container>
      <CardContainer>
        <Title>Verifying...</Title>
        <Message>Please wait while we verify your email.</Message>
      </CardContainer>
    </Container>
  );
}

  return (
    <Container>
      <CardContainer>
        <IconWrapper $success={verificationStatus === 'success'}>
          {verificationStatus === 'success' ? <Check size={24} color="white" /> : <X size={24} color="white" />}
        </IconWrapper>
        <Title>
          {verificationStatus === 'success' ? 'Verification Successful' : 'Verification Failed'}
        </Title>
        <Message>
        {verificationStatus === 'success' 
            ? 'Your email has been successfully verified. You will be redirected to the login page shortly.' 
            : 'We couldn\'t verify your email. Please try again.'}
        </Message>
      </CardContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
    </Container>
  );
};
export default VerificationResult;