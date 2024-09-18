import React, { useEffect } from 'react';
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
  .max(16, 'First name is too long')
  .required('First name cannot be empty.'),

  surname: Yup.string()
  .trim()
  .matches(/^[^\d]+$/,'Numbers are not allowed in this field')
  .min(2, 'Surname is too short.')
  .max(16, 'Surname is too long')
  .required('Surname cannot be empty.'),

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
  dateOfBirth: Yup.date()
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
      await register(values);
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
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setStatus({ error: error.response?.data?.error || 'An error occurred during registration' });
      toast.error(error.response?.data?.error || 'An error occurred during registration', {
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
            surname: '',
            phoneOrEmail: '',
            password: '', 
            dateOfBirth: '', 
            gender: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, status, isSubmitting }) => (
          <Form>
            <StyledField 
            name="firstName" 
            placeholder="First Name"
            error={errors.firstName}
            touched={touched.firstName} />
            {errors.firstName && touched.firstName && <StyledError>{errors.firstName}</StyledError>}

            <StyledField 
            name="surname" 
            placeholder="Surname"
            error={errors.surname}
            touched={touched.surname} />
            {errors.surname && touched.surname && <StyledError>{errors.surname}</StyledError>}

            <StyledField 
            name="phoneOrEmail" 
            placeholder="Phone or Email"
            error={errors.phoneOrEmail}
            touched={touched.phoneOrEmail}  />
            {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}

            <StyledField 
            name="password" 
            type="password" 
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
            />
            {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}

            <StyledField 
            name="dateOfBirth" 
            type="date" 
            placeholder="Date of Birth" 
            error={errors.dateOfBirth}
            touched={touched.dateOfBirth}/>
            {errors.dateOfBirth && touched.dateOfBirth && <StyledError>{errors.dateOfBirth}</StyledError>}

            <Field as="select" 
            name="gender">              
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            {errors.gender && touched.gender && <StyledError>{errors.gender}</StyledError>}

            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Spinner />Submitting...</> : 'Sign Up'}
            </StyledButton>

            {status && status.success && <div>{status.success}</div>}
            {status && status.error && <StyledError>{status.error}</StyledError>}
          </Form>
        )}
      </Formik>
      <StyledLink href="/login">Already have an account?</StyledLink>
    </StyledForm>
    </>
  );
};

export default Registration;



