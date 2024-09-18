import React, { useEffect } from 'react';
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
      await login(values);
      setStatus({ success: 'Login successful!' });
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      resetForm();
      setTimeout(() => {
        navigate('/profile');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setStatus({ error: error.response?.data?.error || 'An error occurred during login' });
      toast.error(error.response?.data?.error || 'An error occurred during login', {
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