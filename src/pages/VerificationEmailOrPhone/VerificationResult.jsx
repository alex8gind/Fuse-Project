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
const { verifyEmail, setTokens } = useUserContext();
const [verificationState, setVerificationState] = useState({
  status: 'pending',
  message: ''
});

useEffect(() => {
  const verifyToken = async () => {
    if (!token) {
      setVerificationState({ 
        status: 'failed', 
        message: 'No verification token provided.' });
      return;
    }

    try {
      const result = await verifyEmail(token);

       // Clear any old verification token
       localStorage.removeItem('verificationToken');

        // Set the new tokens if they exist
        if (result.accessToken && result.refreshToken) {
          setTokens(result.accessToken, result.refreshToken);
        }

        setVerificationState({ 
          status: result.message === 'Email already verified' ? 'already-verified' : 'success',
          message: result.message
        });


        setTimeout(() => {
          // If we got new tokens, redirect to home, otherwise to login
          if (result.accessToken && result.refreshToken) {
            navigate('/');
          } else {
            navigate('/login');
          }
        }, 3000);

    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationState({ 
        status: 'failed', 
        message: error.message || 'We couldn\'t verify your email. Please try again.'  });
    }
  };

  verifyToken();
}, [token, verifyEmail, setTokens, navigate]);


const onClose = () => {
  // If verification was successful and we have tokens, go to home, otherwise to login/register
  if (verificationState.status === 'success' || verificationState.status === 'already-verified') {
    navigate('/');
  } else {
    navigate('/register');
  }
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