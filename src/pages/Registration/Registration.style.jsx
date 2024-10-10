import styled from 'styled-components';
import { Field, Form } from 'formik';

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 400px;
    padding: 1.5rem;
    margin: 2rem auto;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 500px;
    padding: 2rem;
  }
`;

export const FieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => (props.$error && props.$touched ? props.theme.colors.error : '#ddd')};
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: white;
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? props.theme.colors.error : props.theme.colors.primaryOrange)};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 59, 48, 0.2)' : 'rgba(232, 108, 37, 0.2)')};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledPasswordField = styled(StyledField)`
  padding-right: 40px;
`;

export const StyledError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.7em;
  margin-top: 0.25em;
  min-height: 1em;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d15a1f;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.icons};
    cursor: not-allowed;
  }
`;

export const StyledLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.primaryOrange};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const MessageContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

export const SuccessMessage = styled(MessageContainer)`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

export const ErrorMessage = styled(MessageContainer)`
  background-color: #f8d7da;
  color: ${props => props.theme.colors.error};
  border: 1px solid #f5c6cb;
`;



