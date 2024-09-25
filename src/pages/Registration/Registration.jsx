import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css?inline';
import Spinner from '../../components/Spinner/Spinner';
import { registerUser } from '../../store/userActions';
import { setError } from '../../store/userSlice';
import { StyledForm, StyledField, StyledSuccess, StyledError, StyledButton, StyledLink } from './Registration.style';
import PasswordInput from '../../components/PasswordInput';

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

  useEffect(() => {
    return () => {
      dispatch(setError(null));
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
      const resultAction = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(resultAction)) {
        // console.log('Registration response:', resultAction.payload);
        toast.success('Registration successful! Redirecting to login...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
        setTimeout(() => navigate('/login'), 3000);
      } else {
        throw new Error(resultAction.error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error is now handled by the Redux store and displayed via the useEffect above
    } finally {
      setSubmitting(false);
    }
  };
  return (
<>
<ToastContainer />

  <StyledForm>
    <h1>Create an Account</h1>
    <Formik
        initialValues={{ 
            firstName: '', 
            lastName: '',
            phoneOrEmail: '',
            password: '', 
            DateOfBirth: '', 
            gender: '' 
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (

      <Form>
        <div>
            <StyledField 
            name="firstName" 
            placeholder="First Name"
            $hasError={errors.firstName && touched.firstName}
            />
            {errors.firstName && touched.firstName && <StyledError>{errors.firstName}</StyledError>}
        </div>

        <div>
            <StyledField 
            name="lastName" 
            placeholder="Last name"
            $hasError={errors.lastName && touched.lastName} 
            />
            {errors.lastName && touched.lastName && <StyledError>{errors.lastName}</StyledError>}
        </div>

        <div>
            <StyledField 
            name="phoneOrEmail" 
            placeholder="Phone or Email"
            $hasError={errors.phoneOrEmail && touched.phoneOrEmail} 
            />
            {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}
        </div>

        <div>
            <PasswordInput 
            name="password" 
            // type="password" 
            placeholder="Password"
            $hasError={errors.password && touched.password}
            />
            {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}
        </div>

        <div>
            <StyledField 
            name="DateOfBirth" 
            type="date" 
            placeholder="Date of Birth" 
            $hasError={errors.DateOfBirth && touched.DateOfBirth}
            />
            {errors.DateOfBirth && touched.DateOfBirth && <StyledError>{errors.DateOfBirth}</StyledError>}
        </div>

        <div>
            <Field as="select" 
            name="gender">              
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            {errors.gender && touched.gender && <StyledError>{errors.gender}</StyledError>}
        </div>

        <StyledButton type="submit" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? <><Spinner />Submitting...</> : 'Sign Up'}
              </StyledButton>
              {error && <StyledError>{error}</StyledError>}
            </Form>
          )}
        </Formik>
        <StyledLink as={Link} to="/login">Already have an account?</StyledLink>
      </StyledForm>
</>
  );
};

export default Registration;



