import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const StyledField = styled(Field)`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  emailOrPhone: Yup.string()
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
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('https://api.example.com/login', values);
      console.log(response.data);
      setStatus({ success: 'Login successful!' });
    } catch (error) {
      console.error('Login error:', error);
      setStatus({ error: 'Login failed. Please try again.' });
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
          <StyledField name="emailOrPhone" placeholder="Email or Phone" />
          {errors.emailOrPhone && touched.emailOrPhone && <StyledError>{errors.emailOrPhone}</StyledError>}

          <StyledField name="password" type="password" placeholder="Password" />
          {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}

          <StyledButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
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