import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik} from 'formik'; 
import * as Yup from 'yup';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useUserContext } from '../../contexts/user.context';
import {
  Container,
  Title,
  FormikForm,
  Input,
  InputWrapper,
  SubmitButton,
  MessageWrapper,
  ToggleButton,
  StyledError
} from './ResetPassword.style';

// Match password requirements across the application
const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

export const ResetPassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [tokenValid, setTokenValid] = useState(false);
  const [validating, setValidating] = useState(true);
  const { token } = useParams();
  const { resetPassword, validateResetToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate token when component mounts
    const validateToken = async () => {
      try {
        setValidating(true);
        const isValid = await validateResetToken(token);
        setTokenValid(isValid);
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Invalid or expired reset link'  
        });
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };
    validateToken();
  }, [token, validateResetToken]);

   // Show loading state while validating
   if (validating) {
    return (
      <Container>
        <Title>Validating Reset Link</Title>
        <MessageWrapper>Please wait while we validate your reset link...</MessageWrapper>
      </Container>
    );
  }


  // Show error state if token is invalid
  if (!tokenValid) {
    return (
      <Container>
        <Title>Invalid Reset Link</Title>
        <MessageWrapper $type="error">
          {message.text || 'Invalid or expired reset link. Please request a new password reset.'}
        </MessageWrapper>
        <SubmitButton onClick={() => navigate('/forgot-password')}>
          Request New Reset Link
        </SubmitButton>
      </Container>
    );
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await resetPassword(token, values.newPassword);
      setMessage({
        type: 'success',
        text: 'Password reset successful. Redirecting to login...'
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to reset password'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Set New Password</Title>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <FormikForm>
            <InputWrapper>
              <Lock size={24} />
              <Input
                name="newPassword"
                type={showPasswords.newPassword ? 'text' : 'password'}
                placeholder="New Password"
                $error={errors.newPassword && touched.newPassword}
              />
              <ToggleButton
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                {showPasswords.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </ToggleButton>
              {errors.newPassword && touched.newPassword && (
                <StyledError>{errors.newPassword}</StyledError>
              )}
            </InputWrapper>

            <InputWrapper>
              <Lock size={24} />
              <Input
                name="confirmPassword"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                $error={errors.confirmPassword && touched.confirmPassword}
              />
              <ToggleButton
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </ToggleButton>
              {errors.confirmPassword && touched.confirmPassword && (
                <StyledError>{errors.confirmPassword}</StyledError>
              )}
            </InputWrapper>

            {message.text && (
              <MessageWrapper $type={message.type}>
                {message.text}
              </MessageWrapper>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </SubmitButton>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;