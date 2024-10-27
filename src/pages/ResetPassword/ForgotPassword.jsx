import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertCircle } from 'lucide-react';
import { useUserContext } from '../../contexts/user.context';
import {
  Container,
  Title,
  Form,
  Input,
  SubmitButton,
  MessageWrapper,
  InputWrapper,
  BackToLogin
} from './ForgotPassword.style';

const ForgotPassword = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useUserContext();
  const navigate = useNavigate();


   // Validation function
   const validateInput = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    
    if (!value) return 'Phone number or email is required';
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return 'Please enter a valid phone number or email';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     // Validate before submitting
     const validationError = validateInput(phoneOrEmail);
     if (validationError) {
       setMessage({ type: 'error', text: validationError });
       return;
     }
 
     setLoading(true);
     setMessage({ type: '', text: '' });
 
     try {
       await forgotPassword(phoneOrEmail);
       setMessage({ 
         type: 'success', 
         text: 'Reset instructions sent. Please check your inbox.' 
       });
 

     // Redirect after success with delay
     setTimeout(() => {
        navigate('/login');
    }, 3000);

} catch (error) {
    setMessage({ 
      type: 'error', 
      text: error.message || 'Failed to process request'
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <Title>Reset Password</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
            <Mail size={24} />
            <Input
                name="phoneOrEmail" 
                placeholder="Enter your phone or email"
                value={phoneOrEmail}
                onChange={(e) => {
                    setPhoneOrEmail(e.target.value);
                    setMessage({ type: '', text: '' }); // Clear messages on input
                }}
                disabled={loading}
                $error={message.type === 'error'}
                required
            />
        </InputWrapper>

        {message.text && (
          <MessageWrapper $type={message.type}>
            {message.type === 'error' && <AlertCircle size={16} />}
            {message.text}
          </MessageWrapper>
        )}

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </SubmitButton>
      </Form>

      <BackToLogin onClick={() => navigate('/login')}>
        Back to Login
      </BackToLogin>
    </Container>
  );
};

export default ForgotPassword;