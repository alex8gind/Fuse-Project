import React from 'react';
import { Mail, X } from 'lucide-react';
import {VerificationContainer, CloseButton, IconWrapper, Title, Message, Divider, ResendLink} from './VerificationEmailOrPhone.style';


const VerificationEmailOrPhone = ({ email }) => {
  return (
    <VerificationContainer>
      <CloseButton>
        <X size={20} />
      </CloseButton>
      <IconWrapper>
        <Mail size={32} color="white" />
      </IconWrapper>
      <Title>Email Confirmation</Title>
      <Message>
        We have sent email to <strong>{email}</strong> to confirm
        the validity of your email address. 
    After receiving the email
        follow the link provided to complete you registration.
      </Message>
      <Divider />
      <Message>If you received no email, please 
      <ResendLink to="#">Resend confirmation mail</ResendLink>
      </Message>
    </VerificationContainer>
  );
};

export default VerificationEmailOrPhone;