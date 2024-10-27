import styled from 'styled-components';
import { Form, Field } from 'formik';

export const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const MessageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.$type === 'error' ? 
        props.theme.colors.error : 
        props.theme.colors.primaryOrange};
    font-size: 0.875rem;
    margin-top: 0.5rem;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  padding-right: 40px;
  border: 1px solid ${props => props.$error ? props.theme.colors.error : '#ddd'};
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? props.theme.colors.error : props.theme.colors.primaryOrange};
    box-shadow: 0 0 0 2px ${props => props.$error ? 
      `${props.theme.colors.error}20` : 
      `${props.theme.colors.primaryOrange}20`
    };
  }
`;

export const StyledError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.7em;
  margin-top: 0.25em;
  min-height: 1em;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  text-align: center;
  margin: 1rem 0;
  color: ${props => props.$error ? props.theme.colors.error : props.theme.colors.text};
`;

export const BackToLogin = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primaryOrange};
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.icons};
`;

export const SuccessButton = styled(SubmitButton)`
  width: 100%;
  margin-top: 1rem;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.icons};
`;