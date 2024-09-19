import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { StyledForm, StyledField, StyledSuccess, StyledError, StyledButton, StyledLink, CreateAccountButton } from './Login.style';



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

  useEffect(() => {
    // Clear status when component unmounts
    return () => {
      toast.dismiss();
    };
  }, []);

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      console.log('Submitting values:', values);
      const response = await login(values);
      console.log('Login response:', response);
  
      setStatus({ success: 'Login successful!' });
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Store the token in localStorage or a secure storage method
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
  
      setTimeout(() => {
        resetForm();
        navigate('/forgot-password'); 
      }, 2000);
  
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
  
      let errorMessage = 'An error occurred during login';
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // if (error.response.status === 400) {
        //   errorMessage = error.response.data.error || 'Invalid credentials';
        // } else if (error.response.status === 401) {
        //   errorMessage = 'Unauthorized. Please check your credentials.';
        // } else if (error.response.status === 404) {
        //   errorMessage = 'User not found. Please check your email/phone.';
        // } else if (error.response.status === 429) {
        //   errorMessage = 'Too many login attempts. Please try again later.';
        // }
        errorMessage = error.response.data.error;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
  
      setStatus({ error: errorMessage });
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <>
    <ToastContainer />
    <Formik
      initialValues={{ phoneOrEmail: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, status, resetForm }) => (
        <StyledForm>

        <StyledField 
        name="phoneOrEmail" 
        placeholder="Email or Phone"
        $error={errors.phoneOrEmail}
        $touched={touched.phoneOrEmail}
        />
        {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}

        <StyledField 
        name="password" 
        type="password" 
        placeholder="Password"
        $error={errors.password}
        $touched={touched.password}
        />
        {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}
          
        <StyledButton 
          type="submit" 
          disabled={isSubmitting}>
            {isSubmitting ? <><Spinner />Logging in...</>: 'Log In'}
        </StyledButton>

          {status && status.error && typeof status.error === 'string' && <StyledError>{status.error}</StyledError>}
          {status && status.success && typeof status.success === 'string' && <StyledSuccess>{status.success}</StyledSuccess>}

          <StyledLink as={Link} to="/forgot-password">Forgot password?</StyledLink>

          <CreateAccountButton type="button" onClick={() => {
              resetForm();
              navigate('/register');
          }}>
            Create New Account
          </CreateAccountButton>
        </StyledForm>
      )}
    </Formik>
  </>
  );
};

export default Login;