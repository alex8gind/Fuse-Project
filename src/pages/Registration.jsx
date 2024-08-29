import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';


 const StyledForm = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

 const StyledField = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  font-size: 1rem;
`;

 const StyledError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

 const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #166fe5;
  }
`;

  const StyledLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #166fe5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  phoneOrEmail: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  dateOfBirth: Yup.date().required('Required'),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Required'),
});

const Registration = () => {
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('/api/register', values);
      setStatus({ success: 'Registration successful!' });
    } catch (error) {
      setStatus({ error: 'Registration failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
        {({ errors, touched, status }) => (
          <Form>
            <StyledField name="firstName" placeholder="First Name" />
            {errors.name && touched.name && <StyledError>{errors.name}</StyledError>}

            <StyledField name="surname" placeholder="Surname" />
            {errors.surname && touched.surname && <StyledError>{errors.surname}</StyledError>}

            <StyledField name="phoneOrEmail" placeholder="Phone or Email" />
            {errors.phoneOrEmail && touched.phoneOrEmail && <StyledError>{errors.phoneOrEmail}</StyledError>}

            <StyledField name="password" type="password" placeholder="Password" />
            {errors.password && touched.password && <StyledError>{errors.password}</StyledError>}

            <StyledField name="dateOfBirth" type="date" placeholder="Date of Birth" />
            {errors.dateOfBirth && touched.dateOfBirth && <StyledError>{errors.dateOfBirth}</StyledError>}

            <Field as="select" name="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            {errors.gender && touched.gender && <StyledError>{errors.gender}</StyledError>}

            <StyledButton type="submit">Sign Up</StyledButton>

            {status && status.success && <div>{status.success}</div>}
            {status && status.error && <StyledError>{status.error}</StyledError>}
          </Form>
        )}
      </Formik>
      <StyledLink href="/login">Already have an account?</StyledLink>
    </StyledForm>
  );
};

export default Registration;



