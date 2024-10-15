import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X, Loader} from 'lucide-react';
import { useUserContext } from '../../contexts/user.context';
import {
  VerificationContainer,
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
    const { sendVerificationEmail, user } = useUserContext();
    const [isResending, setIsResending] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [verificationState, setVerificationState] = useState({
      status: 'loading',
      message: ''
    });

    useEffect(() => {
      const initiateVerification = async () => {
        if (!localStorage.getItem('accessToken')) {
          navigate('/login');
          return;
        }
        try {
          const response = await sendVerificationEmail();
          if (response.status === 200) {
            setVerificationState({
              status: 'success',
              message: 'Verification email sent successfully.'
            });
          } else if (response.status === 400) {
            setVerificationState({
              status: 'info',
              message: response.data.error
            });
          }
        } catch (error) {
          console.log( error);
          if(error.response?.status === 400 && error.response?.data?.reason === 'Verification email has already been sent') {
            setVerificationState({
              status: 'already-sent',
              message: 'Verification link has already been sent, please check your email'
            }); 
            return;
          }
          setVerificationState({
            status: 'error',
            message: error.response?.data?.error || 'Failed to send verification email'
          });
        }
      };
  
      initiateVerification();
    }, [sendVerificationEmail]);

    useEffect(() => {
      console.log("VerificytionState", verificationState);
    }, [verificationState])

    const handleResendEmail = async () => {
      if (isResending) return;
      setIsResending(true);
      try {
        const response = await sendVerificationEmail();
        if (response.status === 200) {
          setMessage({ type: 'success', text: 'Verification email resent successfully.' });
        } else if (response.status === 400) {
          setMessage({ type: 'info', text: response.data.error.message || 'Failed to resend verification email' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to resend verification email' });
      } finally {
        setIsResending(false);
      }
    };

    // if (verificationState.status === 'loading') {
    //   return (
    //     <VerificationContainer>
    //       <Message>Loading...</Message>
    //     </VerificationContainer>
    //   );
    // }


    return (
      <VerificationContainer>

        <CloseButton onClick={() => navigate('/login')}>
          <X size={20} />
        </CloseButton>

        <IconWrapper>
        {verificationState.status === 'loading' ? (
          <Loader size={32} color="white" />
        ) : (
          <Mail size={32} color="white" />
        )}
        </IconWrapper>

        {verificationState.status === 'loading' && (
          <>
            <Title>Please wait..</Title>
          </>
      )}

        {verificationState.status === 'success' && (
          <>
            <Title>Email Confirmation</Title>
          </>
        )}

        {verificationState.status === 'already-sent' && (
          <>
            <Title>Link has been sent earlier...</Title>
          </>
        )}

        {verificationState.status === 'loading' && (
          <>
            <Message>Sending verification email...</Message>
          </>
      )}
  
        {verificationState.status === 'success' && (
          <>
            <Message>
              We have sent an email to <strong>{user?.phoneOrEmail}</strong>. To confirm
              the validity of your email address, please follow the link provided to complete your registration.
            </Message>

            <Divider />

            <Message>
              If you haven't received the email, please 
              <CLink onClick={handleResendEmail} disabled={isResending}>
                {isResending ? 'Resending...' : 'Resend confirmation email'}
              </CLink>
            </Message>
          </>
        )}

        {verificationState.status === 'already-sent' && (
          <>
            <Message>
              We have already sent a verification link to <strong>{user?.phoneOrEmail}</strong> earlier. Please check 
              your email and follow the link provided to complete your registration.
            </Message>

            <Divider />

            <Message>
              If you haven't received the email, please 
              <CLink onClick={handleResendEmail} disabled={isResending}>
                {isResending ? 'Resending...' : 'Resend confirmation email'}
              </CLink>
            </Message>
          </>
        )}
  
        {verificationState.status === 'info' && (
          <>
            <Message>
              {verificationState.message}
              <CLink onClick={() => navigate('/login')}>Login</CLink>
            </Message>
          </>
        )}
  
        <MessageContainer $visible={!!message.text}>
          {message.type === 'success' && <SuccessMessage>{message.text}</SuccessMessage>}
          {message.type === 'error' && <ErrorMessage>{message.text}</ErrorMessage>}
          {message.type === 'info' && <Message>{message.text}</Message>}
        </MessageContainer>
      </VerificationContainer>
    );
  };
  
  export default VerificationEmailOrPhone;