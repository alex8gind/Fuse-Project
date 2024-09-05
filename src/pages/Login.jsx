import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const StyledField = styled(Field)`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid ${props => (props.error && props.touched ? '#FF0000' : '#dddfe2')};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => (props.error && props.touched ? '#FF0000' : '#1877f2')};
    box-shadow: 0 0 0 2px ${props => (props.error && props.touched ? 'rgba(255, 0, 0, 0.2)' : 'rgba(24, 119, 242, 0.2)')};
  }
`;


const StyledError = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  background-color: #1877f2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 10px;

  &:hover {
    background-color: #166fe5;
  }
`;

const StyledLink = styled.a`
  color: #1877f2;
  text-decoration: none;
  font-size: 0.9em;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const CreateAccountButton = styled(StyledButton)`
  background-color: #42b72a;

  &:hover {
    background-color: #36a420;
  }
`;

const LoginSchema = Yup.object().shape({
  phoneOrEmail: Yup.string()
    .trim()
    .required('Email or Phone is required')
    .test('email-or-phone', 'Enter a valid email or phone number', function(value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values);
      navigate('/profile');
    } catch (error) {
      setStatus({ error: error.response?.data?.error || 'An error occurred during login' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ emailOrPhone: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, status }) => (
        <StyledForm>

          <StyledField 
          name="phoneOrEmail" 
          placeholder="Email or Phone"
          error={errors.phoneOrEmail}
          touched={touched.phoneOrEmail}/>
          {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}

          <StyledField 
          name="password" 
          type="password" 
          placeholder="Password"
          error={errors.password}
          touched={touched.password} />
          {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}

          <StyledButton 
          type="submit" 
          disabled={isSubmitting}>
            {isSubmitting ? <><Spinner />Logging in...</>: 'Log In'}
          </StyledButton>

          {status && status.error && <StyledError>{status.error}</StyledError>}
          {status && status.success && <div>{status.success}</div>}

          <StyledLink href="/forgot-password">Forgot password?</StyledLink>

          <CreateAccountButton type="button" onClick={() => { /* Handle create account logic */ }}>
            Create New Account
          </CreateAccountButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Login;