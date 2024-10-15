import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useUserContext } from '../../contexts/user.context'; 
import {Link} from 'react-router-dom';
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
const [verificationState, setVerificationState] = useState({
  status: 'pending',
  message: ''
});

useEffect(() => {
  const verifyToken = async () => {
    if (!token) {
      setVerificationState({ status: 'failed', message: 'No verification token provided.' });
      return;
    }

    try {
      const result = await verifyEmail(token);
      if (result.message === 'Email already verified') {
        setVerificationState({ status: 'already-verified', message: 'Your email was already verified.' });
      } else {
        setVerificationState({ status: 'success', message: 'Your email has been successfully verified.' });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationState({ status: 'failed', message: 'We couldn\'t verify your email. Please try again.' });
    }
  };

  verifyToken();
}, [token, verifyEmail]);


// useEffect(() => {
//   if (verificationState.status === 'success' || verificationState.status === 'already-verified') {
//     const timer = setTimeout(() => {
//       navigate('/login');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }
// }, [verificationState.status, navigate]);

const onClose = () => {
  navigate(verificationState.status === 'success' || verificationState.status === 'already-verified' ? '/login' : '/register');
};

if (verificationState.status === 'pending') {
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
        <IconWrapper $success={verificationState.status === 'success' || verificationState.status === 'already-verified'}>
          {verificationState.status === 'success' || verificationState.status === 'already-verified' ? <Check size={24} color="white" /> : <X size={24} color="white" />}
        </IconWrapper>
        <Title>
        {verificationState.status === 'success' ? 'Verification Successful' : 
           verificationState.status === 'already-verified' ? 'Already Verified' : 'Verification Failed'}
        </Title>
        <Message>
          {verificationState.message} 
          {(verificationState.status === 'success' || verificationState.status === 'already-verified') && 
            <> You may <Link to="/login">Login now</Link></>
          }
        </Message>
      </CardContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
    </Container>
  );
};
export default VerificationResult;