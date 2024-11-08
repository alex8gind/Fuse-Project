import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, X, Loader, AlertTriangle} from 'lucide-react';
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
   InfoMessage,
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
    const location = useLocation();
    const { sendVerificationEmail, user } = useUserContext();
    const [isResending, setIsResending] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [verificationState, setVerificationState] = useState({
      status: 'loading',
      message: ''
    });

  //     // Check if user just registered
  // const justRegistered = location.state?.justRegistered;
  // const userEmail = location.state?.email;

  // useEffect(() => {
  //   // Only automatically send verification email if user just registered
  //   if (justRegistered && userEmail) {
  //     initiateVerification();
  //   } else {
  //     setVerificationState({
  //       status: 'ready',
  //       message: 'Please verify your email to continue'
  //     });
  //   }
  // }, [justRegistered, userEmail]);
  
    const initiateVerification = async () => {
      // if (!localStorage.getItem('accessToken')) {
      //   navigate('/login');
      //   return;
      // }
      try {
        await sendVerificationEmail();
        setVerificationState({
          status: 'success',
          message: 'Verification email sent successfully.'
        });
      } catch (error) {
        console.error(error);
        setVerificationState({
          status: 'error',
          message: error.message || 'Failed to send verification email'
        });
      }
    };

    useEffect(() => {
      initiateVerification();
    }, [navigate]);
  
    const handleResendEmail = async () => {
      console.log("HANDLE RESEND EMAIL");
      if (isResending) return;
      setIsResending(true);

      try {
        await sendVerificationEmail();
        setMessage({ 
          type: 'success', 
          text: 'Verification email resent successfully.' 
        });
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to resend verification email'
        });
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
          {verificationState.status === 'loading' ? (
            <Loader size={32} color="white" />
          ) : verificationState.status === 'error' ? (
            <AlertTriangle size={32} color="yellow" />
          ) : (
            <Mail size={32} color="white" />
          )}
        </IconWrapper>
  
        <Title>
          {verificationState.status === 'loading' ? 'Please wait...' :
           verificationState.status === 'success' ? 'Email Confirmation' :
           'Verification Status'}
        </Title>
  
        <Message>
          {verificationState.status === 'loading' ? 'Sending verification email...' :
           verificationState.status === 'success' ? 
             `We have sent an email to ${user?.phoneOrEmail}. To confirm the validity of your email address, please follow the link provided to complete your registration.` :
           verificationState.message}
        </Message>
  
        {verificationState.status !== 'loading' && (
          <>
            <Divider />
            <Message>
              If you haven't received the email, please click 
              <CLink onClick={handleResendEmail} disabled={isResending}>
                {isResending ? 'Resending...' : 'Resend confirmation email'}
              </CLink>
            </Message>
          </>
        )}
  
        <MessageContainer $visible={!!message.text}>
          {message.type === 'success' && <SuccessMessage>{message.text}</SuccessMessage>}
          {message.type === 'error' && <ErrorMessage>{message.text}</ErrorMessage>}
          {message.type === 'info' && <InfoMessage>{message.text}</InfoMessage>}
        </MessageContainer>
      </VerificationContainer>
    );
  };
  
  export default VerificationEmailOrPhone;

  //   useEffect(() => {
  //     const initiateVerification = async () => {
  //       if (!localStorage.getItem('accessToken')) {
  //         navigate('/login');
  //         return;
  //       }
  //       try {
  //         const response = await sendVerificationEmail();
  //         if (response.status === 200) {
  //           setVerificationState({
  //             status: 'success',
  //             message: 'Verification email sent successfully.'
  //           });
  //         } else if (response.status === 400) {
  //           setVerificationState({
  //             status: 'info',
  //             message: response.data.error
  //           });
  //         }
  //       } catch (error) {
  //         console.log( error);
  //         if(error.response?.status === 400 && error.response?.data?.reason === 'Verification email has already been sent') {
  //           setVerificationState({
  //             status: 'already-sent',
  //             message: 'Verification link has already been sent, please check your email'
  //           }); 
  //           return;
  //         }
  //         setVerificationState({
  //           status: 'error',
  //           message: error.response?.data?.error || 'Failed to send verification email'
  //         });
  //       }
  //     };
  
  //     initiateVerification();
  //   }, [sendVerificationEmail]);

  //   useEffect(() => {
  //     console.log("VerificytionState", verificationState);
  //     if (typeof verificationState.message !== 'string') {
  //       alert(typeof verificationState.message);
  //     }
  //   }, [verificationState])

  //   const handleResendEmail = async () => {
  //     if (isResending) return;
  //     setIsResending(true);
  //     try {
  //       const response = await sendVerificationEmail();
  //       setMessage({ 
  //         type: 'success', 
  //         text: 'Verification email resent successfully.' 
  //       });
  //       setVerificationState({
  //         status: 'success',
  //         message: 'Verification email resent successfully.'
  //       });
  //     } catch (error) {
  //       console.error("ERROR:::", error);
  //       let errorMessage = 'Failed to resend verification email';
  //       if (typeof error === 'string') {
  //         errorMessage = String(error);
  //       } else if (error instanceof Error) {
  //         errorMessage = String(error.message);
  //       } else if (error.response?.data?.error.message) {
  //         errorMessage = String(error.response.data.error.message);
  //       }
    
  //       if (errorMessage === 'Please wait before requesting another verification email.') {
  //         setMessage({ 
  //           type: 'info', 
  //           text: errorMessage
  //         });
  //       } else {
  //         setMessage({ 
  //           type: 'error', 
  //           text: errorMessage
  //         });
  //       }
  //     } finally {
  //       setIsResending(false);
  //     }
  //   };

  //   // if (verificationState.status === 'loading') {
  //   //   return (
  //   //     <VerificationContainer>
  //   //       <Message>Loading...</Message>
  //   //     </VerificationContainer>
  //   //   );
  //   // }


  //   return (
  //     <VerificationContainer>

  //       <CloseButton onClick={() => navigate('/login')}>
  //         <X size={20} />
  //       </CloseButton>

  //       <IconWrapper>
  //       {verificationState.status === 'loading' ? (
  //         <Loader size={32} color="white" />
  //       ) : (
  //         <Mail size={32} color="white" />
  //       )}
  //       </IconWrapper>

  //     <Title>
  //       {verificationState.status === 'loading' ? 'Please wait...' :
  //        verificationState.status === 'success' ? 'Email Confirmation' :
  //        verificationState.status === 'already-sent' ? 'Link has been sent earlier' :
  //        'Verification Status'}
  //     </Title>

  //     <Message>
  //       {verificationState.status === 'loading' ? 'Sending verification email...' :
  //        verificationState.status === 'success' ? 
  //          `We have sent an email to ${user?.phoneOrEmail}. To confirm the validity of your email address, please follow the link provided to complete your registration.` :
  //        verificationState.status === 'already-sent' ?
  //          `We have already sent a verification link to ${user?.phoneOrEmail} earlier. Please check your email and follow the link provided to complete your registration.` :
  //        verificationState.message}
  //     </Message>

  //     {(verificationState.status === 'success' || verificationState.status === 'already-sent') && (
  //       <>
  //         <Divider />
  //         <Message>
  //           If you haven't received the email, please click 
  //           <CLink onClick={handleResendEmail} disabled={isResending}>
  //             {isResending ? 'Resending...' : 'Resend confirmation email'}
  //           </CLink>
  //         </Message>
  //       </>
  //     )}
  
  //       <MessageContainer $visible={!!message.text}>
  //         {message.type === 'success' && <SuccessMessage>{message.text}</SuccessMessage>}
  //         {message.type === 'error' && <ErrorMessage>{message.text}</ErrorMessage>}
  //         {message.type === 'info' && <Message>{message.text}</Message>}
  //         {message.type === 'already-sent' && <Message>{message.text}</Message>}
  //       </MessageContainer>

  //     </VerificationContainer>
  //   );
  // };
  
  // export default VerificationEmailOrPhone;