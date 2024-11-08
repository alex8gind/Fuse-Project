import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../../components/Spinner';
import { setError } from '../../store/userSlice';
import ErrorNotification from '../../components/ErrorNotification';
import Logo from '../../components/Logo.jsx';
import { 
  StyledForm, 
  LogoContainer,
  Title,
  StyledField, 
  StyledSelect,
  SelectWrapper,
  StyledButton, 
  StyledLink,
  StyledError,
  FieldWrapper,
  PasswordWrapper,
  StyledPasswordField,
  ToggleButton,
  MessageContainer,
  SuccessMessage,
  ErrorMessage
} from './Registration.style';
import { useUserContext } from '../../contexts/user.context';

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .matches(/^[^\d]+$/,'Numbers are not allowed in this field')
    .min(2, 'First name is too short.')
    .max(50, 'First name is too long')
    .required('First name cannot be empty.'),

  lastName: Yup.string()
    .trim()
    .matches(/^[^\d]+$/,'Numbers are not allowed in this field')
    .min(2, 'Last name is too short.')
    .max(16, 'Last name is too long')
    .required('Last name cannot be empty.'),

  phoneOrEmail: Yup.string()
    .trim()
    .test('phone-or-email', 'Enter a valid phone number or email', function(value) {
      const phoneRegExp = /^\+?[1-9]\d{1,14}$/;
      const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return phoneRegExp.test(value) || emailRegExp.test(value);
    })
    .required('Phone number or email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  DateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 16 years old')
    .min(new Date(Date.now() - 120 * 365 * 24 * 60 * 60 * 1000), 'Please enter a valid date of birth'),
  
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Please select your gender'),
});

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const {register} = useUserContext();

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setMessage({ type: 'error', text: error });
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Submitting values:', values);
      const user = await register(values);

      if(user){
      setMessage({ 
        type: 'success', 
        text: 'Registration successful! You will be redirected to the verification page...' 
      });
        resetForm();

        setTimeout(() => navigate('/verify'), {
           state: {
             email: values.phoneOrEmail,
             justRegistered: true  
            } }), 2000;
      } else {
        throw new Error(resultAction.error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ 
          firstName: 'Oleksandra', 
          lastName: 'Gindina',
          phoneOrEmail: 'alex8gind@gmail.com',
          password: 'Rabota7890!-', 
          DateOfBirth: "08.11.1988", 
          gender: 'other' 
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
           <LogoContainer><Logo /></LogoContainer> 
            <Title>When Safety brings Freedom</Title>
            
            <FieldWrapper>
              <StyledField 
                name="firstName" 
                placeholder="First Name"
                $error={errors.firstName}
                $touched={touched.firstName}
              />
              {errors.firstName && touched.firstName && 
                <StyledError>{errors.firstName}</StyledError>}
            </FieldWrapper>

            <FieldWrapper>
              <StyledField 
                name="lastName" 
                placeholder="Last name"
                $error={errors.lastName}
                $touched={touched.lastName}
              />
              {errors.lastName && touched.lastName && <StyledError>{errors.lastName}</StyledError>}
            </FieldWrapper>

            <FieldWrapper>
              <StyledField 
                name="phoneOrEmail" 
                placeholder="Phone or Email"
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

            <FieldWrapper>
              <StyledField 
                name="DateOfBirth" 
                type="date" 
                placeholder="Date of Birth" 
                $error={errors.DateOfBirth}
                $touched={touched.DateOfBirth}
              />
              {errors.DateOfBirth && touched.DateOfBirth && <StyledError>{errors.DateOfBirth}</StyledError>}
            </FieldWrapper>

            <FieldWrapper>
              <SelectWrapper>
                <StyledSelect
                  as="select" 
                  name="gender"
                  $error={errors.gender}
                  $touched={touched.gender}
                >              
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </StyledSelect>
              </SelectWrapper>
              {errors.gender && touched.gender && <StyledError>{errors.gender}</StyledError>}
            </FieldWrapper>

            <StyledButton type="submit" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? <><Spinner />Submitting...</> : 'Sign Up'}
            </StyledButton>
            <StyledLink as={Link} to="/login">Already have an account?</StyledLink>

            <MessageContainer $visible={!!message.text}>
                {message.type === 'success' && (
                  <SuccessMessage>{message.text}</SuccessMessage>
                )}
                {message.type === 'error' && (
                  <ErrorMessage>{message.text}</ErrorMessage>
                )}
            </MessageContainer>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default Registration;