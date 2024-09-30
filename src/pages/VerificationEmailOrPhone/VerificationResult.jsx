import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import {
  Container,
  CardContainer,
  IconWrapper,
  Title,
  Message,
  CloseButton
} from './VerificationResult.style';

const VerificationResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();
  const success = result === 'success';

  useEffect(() => {
    if (success) {
      // Automatically redirect to login page after 3 seconds on success
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onClose = () => {
    // Navigate to the appropriate page after closing
    navigate(success ? '/' : '/register');
  };

  return (
    <Container>
      <CardContainer>
        <IconWrapper $success={success}>
          {success ? <Check size={24} color="white" /> : <X size={24} color="white" />}
        </IconWrapper>
        <Title>
          {success ? 'Verification Successful' : 'Verification Failed'}
        </Title>
        <Message>
          {success 
            ? 'Your account has been successfully verified.' 
            : 'We couldn\'t verify your account. Please try again.'}
        </Message>
      </CardContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
    </Container>
  );
};

export default VerificationResult;