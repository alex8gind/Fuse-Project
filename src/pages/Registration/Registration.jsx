import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner/Spinner';
import { register } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { StyledForm, StyledField, StyledSuccess, StyledError, StyledButton, StyledLink } from './Registration.style';


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

  useEffect(() => {
    // Clear toasts when component unmounts
    return () => {
      toast.dismiss();
    };
  }, []);

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      console.log('Submitting values:', values);
      const response = await register(values);
      console.log('Registration response:', response);
  
      if (response && response.user) {
        setStatus({ success: 'Registration successful!' });
        toast.success('Registration successful! Redirecting to login...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          resetForm();
          navigate('/login');
        }, 3000);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Full error object:', error);
      let errorMessage = error.message || 'An error occurred during registration';
      
      // Check if the error is due to an existing user
      if (error.response && error.response.status === 409) {
        errorMessage = 'User already exists. Please use a different email or phone number.';
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
        {({ errors, touched, status, isSubmitting }) => (

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
            <StyledField 
            name="password" 
            type="password" 
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

      <StyledButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><Spinner />Submitting...</> : 'Sign Up'}
      </StyledButton>

      {status && status.success && typeof status.success === 'string' && (
        <StyledSuccess>{status.success}</StyledSuccess>
      )}

      {status && status.error && typeof status.error === 'string' && (
        <StyledError>{status.error}</StyledError>
      )}

      </Form>

      )}
    </Formik>

    <StyledLink as={Link} to="/login">Already have an account?</StyledLink>
  
  </StyledForm>
</>
  );
};

export default Registration;



