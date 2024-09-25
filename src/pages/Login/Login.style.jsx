import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 300px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 320px;
  }
`;

export const StyledField = styled(Field)`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid ${props => (props.$error && props.$touched ? '#FF0000' : '#dddfe2')};
  border-radius: 4px;
  font-size: 0.9rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? '#FF0000' : '#1877f2')};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 0, 0, 0.2)' : 'rgba(24, 119, 242, 0.2)')};
  }
`;


export const StyledError = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 10px;
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
  background-color: #1877f2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 10px;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1em;
  }

  &:hover {
    background-color: #166fe5;
  }
`;

export const StyledLink = styled.a`
  color: #1877f2;
  text-decoration: none;
  font-size: 0.9em;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const CreateAccountButton = styled(StyledButton)`
  background-color: #42b72a;

  &:hover {
    background-color: #36a420;
  }
`;