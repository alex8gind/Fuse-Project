import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, X } from 'lucide-react';
import { useUserContext } from '../../contexts/user.context';
import { VerificationContainer,
   CloseButton, 
   IconWrapper, 
   Title, 
   MessageContainer,
   Message, 
   SuccessMessage,
   ErrorMessage,
   Divider, 
   CLink } from './VerificationEmailOrPhone.style';


   /**
    * 0. If user is not Loggedin, re-direct to login
    * 1. Check if Verification email should be sent (avoid double-verification)
    * 2. If already verified, disply a message to say this to a user and give a login link.
    * 3. If not, send verification email
    * 4. Provide Resend email link and display message that it was resent
    */
const VerificationEmailOrPhone = () => {
  const navigate = useNavigate();
  const { sendVerificationEmail, verificationStatus } = useUserContext();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });


  useEffect(() => {
    sendVerificationEmail()
  }, [])

  const handleResendEmail = async () => {
    if (isResending) return;
    setIsResending(true);
    try {
      await sendVerificationEmail();
      setMessage({ type: 'success', text: 'Verification email resent successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend verification email. Please try again.' });
    } finally {
      setIsResending(false);
    }
  };


  return (
    <VerificationContainer>
      <CloseButton onClick={() => navigate('/login')}>
        <X size={20} />
      </CloseButton>
      <IconWrapper>
        <Mail size={32} color="white" />
      </IconWrapper>
      <Title>Email Confirmation</Title>
      {!verificationStatus &&
      <>
        <Message>
          We have sent email to <strong>{}</strong>. To confirm
          the validity of your email address, please follow the link provided to complete your registration.
        </Message>
        <Divider />

        <Message>If you received no email, please 
        <CLink onClick={handleResendEmail} disabled={isResending}>
        {isResending ? 'Resending...' : 'Resend confirmation email'}
        </CLink>
        </Message>
      </>}

      {verificationStatus === 409 && (
        <Message>
          Your email has been already verified. Please login to continue.
          <CLink onClick={() => navigate('/login')}>Login</CLink>
        </Message>
      )}

      {verificationStatus === 200 && (
        <Message>
          We have re-sent a Verification email, please follow the link provided to complete your registration.
        </Message>
      )}    
      <MessageContainer $visible={!!message.text}>
        {message.type === 'success' && (
          <SuccessMessage>{message.text}</SuccessMessage>
        )}
        {message.type === 'error' && (
          <ErrorMessage>{message.text}</ErrorMessage>
        )}
      </MessageContainer>

    </VerificationContainer>
  );
};

export default VerificationEmailOrPhone;