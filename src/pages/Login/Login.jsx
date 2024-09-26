import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css?inline';
import Spinner from '../../components/Spinner/Spinner';
import { loginUser } from '../../store/userActions';
import { setError } from '../../store/userSlice';
import { StyledForm, StyledField, StyledError, StyledButton, StyledLink, CreateAccountButton } from './Login.style';
import PasswordInput from '../../components/PasswordInput';
import { UserContext } from '../../contexts/user.context';


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
  const {login} = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { loading, error } = useSelector(state => state.user);

 
  useEffect(() => {
    return () => {
      dispatch(setError(null)); // Clear any existing errors when component unmounts
      toast.dismiss();
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Submitting values:', values);
      const data = await login(values);
      console.log('Login data:', data);
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        resetForm();
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      // Error is now handled by the Redux store and displayed via the useEffect above
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
      {({ errors, touched, isSubmitting, resetForm }) => (
        <StyledForm>

        <StyledField 
        name="phoneOrEmail" 
        placeholder="Email or Phone"
        $error={errors.phoneOrEmail}
        $touched={touched.phoneOrEmail}
        />
        {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}

        <PasswordInput 
        name="password" 
        // type="password" 
        placeholder="Password"
        $error={errors.password}
        $touched={touched.password}
        />
        {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}
          
        <StyledButton 
              type="submit" 
              disabled={isSubmitting || loading}>
                {isSubmitting || loading ? <><Spinner />Logging in...</> : 'Log In'}
            </StyledButton>
            {error && <StyledError>{error}</StyledError>}
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