import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../contexts/user.context';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../../components/Spinner';
import GoogleSvg from "../../assets/icons/google.svg";
import { setError } from '../../store/userSlice';
import ErrorNotification from '../../components/ErrorNotification';
import Logo from '../../components/Logo.jsx';
import { 
  StyledForm, 
  LogoContainer,
  Title,
  FieldWrapper,
  StyledField, 
  StyledError, 
  StyledButton, 
  StyledLink, 
  CheckboxLinkContainer,
  CheckboxContainer,
  StyledCheckbox,
  CheckboxLabel,
  ForgotPasswordContainer,
  OrDivider,
  GoogleButton,
  GoogleIcon,
  CreateAccountButton,
  PasswordWrapper,
  StyledPasswordField,
  ToggleButton
} from './Login.style';

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
  staySignedIn: Yup.boolean()
});

const Login = () => {
  const {login, loginWithGoogle} = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { loading, error } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorNotification({ type: 'error', message: error });
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Submitting values:', values);
      const loggedinUser = await login(values);
      console.log('Login data:', loggedinUser);
      setErrorNotification({ type: 'success', message: 'Login successful! Redirecting...' });
      if(!loggedinUser?.isPhoneOrEmailVerified) {
        navigate('/verify');
      } else {
        navigate('/');
      }
      resetForm();
    } catch (error) {
      console.error('Login error:', error);
      setErrorNotification({ type: 'error', message: 'Login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/'); // Navigate to home page after successful login
        } catch (error) {
            console.error('Google login failed:', error);
            // Handle error (show error message to user)
        }
  };

  return (
    <>
       {errorNotification && (
        <ErrorNotification
          type={errorNotification.type}
          message={errorNotification.message}
          onClose={() => setErrorNotification(null)}
        />
      )}
      <Formik
        initialValues={{ phoneOrEmail: 'alex8gind@gmail.com', password: 'Rabota7890!-', staySignedIn: true }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, resetForm }) => (
          <StyledForm>
            <LogoContainer><Logo /></LogoContainer>
            <Title>Safe is a new Sexy :)</Title>
            <FieldWrapper>
              <StyledField 
                name="phoneOrEmail" 
                placeholder="Email or Phone"
                $error={errors.phoneOrEmail}
                $touched={touched.phoneOrEmail}
              />
              {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}
            </FieldWrapper>

            <FieldWrapper>
              <PasswordWrapper>
                <StyledPasswordField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  $error={errors.password}
                  $touched={touched.password}
                />
                <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </ToggleButton>
              </PasswordWrapper>
              {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}
            </FieldWrapper>
            
            <CheckboxLinkContainer>
              <CheckboxContainer>
                <StyledCheckbox type="checkbox" name="staySignedIn" id="staySignedIn" />
                <CheckboxLabel htmlFor="staySignedIn">Stay signed in</CheckboxLabel>
              </CheckboxContainer>
            
              <ForgotPasswordContainer>
                <StyledLink as={Link} to="/forgot-password">Forgot password?</StyledLink>
              </ForgotPasswordContainer>           
            </CheckboxLinkContainer>

            <StyledButton 
              type="submit" 
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? <><Spinner />Logging in...</> : 'Log In'}
            </StyledButton>

            {error && <StyledError>{error}</StyledError>}

            <OrDivider>OR</OrDivider>

            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <GoogleIcon src={GoogleSvg} alt="Google" />
              Continue with Google
            </GoogleButton>

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
