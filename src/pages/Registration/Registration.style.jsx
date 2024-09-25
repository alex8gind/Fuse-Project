import styled from 'styled-components';
import { Field } from 'formik';

export const StyledForm = styled.div`
  max-width: 300px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 400px;
    padding: 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 500px;
  }
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => (props.$hasError ? '#FF0000' : '#dddfe2')};
  border-radius: 4px;
  font-size: 0.9rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? '#FF0000' : '#1877f2')};
    box-shadow: 0 0 0 2px ${props => (props.$hasError ? 'rgba(255, 0, 0, 0.2)' : 'rgba(24, 119, 242, 0.2)')};
  }
`;

export const StyledError = styled.div`
color: red;
font-size: 0.8rem;
margin-bottom: 0.5rem;
`;

export const StyledSuccess = styled.div`
  color: #4caf50;
  background-color: #e8f5e9;
  border: 1px solid #4caf50;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #166fe5;
  }

  &:disabled {
    background-color: #7f7f7f;
    cursor: not-allowed;
  }
`;


export const StyledLink = styled.a`
display: block;
text-align: center;
margin-top: 1rem;
color: #166fe5;
text-decoration: none;

&:hover {
  text-decoration: underline;
}
`;