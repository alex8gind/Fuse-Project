import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 310px;
  height: 80vh;
  border-radius: 6px;
  margin: auto;
  padding: 1em 2em;
  background-color: ${props => props.theme.colors.navigation_bg};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 340px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 360px;
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

  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? props.theme.colors.error : props.theme.colors.primaryOrange)};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 59, 48, 0.2)' : 'rgba(232, 108, 37, 0.2)')};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

export const StyledError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.7em;
  margin-top: 0.25em;
  min-height: 1em;
`;

export const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  padding: .75rem .5em;
  border: none;
  border-radius: 20vh;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

export const StyledLink = styled.a`
  color: #222;
  text-decoration: none;
  font-size: 14px;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export const CheckboxLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  width: 100%;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  padding: 0.5em;
  padding-bottom: 2em;
`;

export const StyledCheckbox = styled(Field)`
  margin-right: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  font-size: .9em;
  display: flex;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3em;
  padding: 0.5em;
  padding-bottom: 2em;
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  font-size: 14px;
  width: 100%;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #151313;
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 12px;
  }
`;

export const GoogleButton = styled(StyledButton)`
  background-color: white;
  color: ${props => props.theme.colors.text};
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const GoogleIcon = styled.img`
  width: 2rem;
  height: 2rem;
  padding-right: 0.5rem;
`;

export const CreateAccountButton = styled(StyledButton)`
  background-color: white;
  color: #222;
  border: 1px solid #222;
  margin-top: 1rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledPasswordField = styled(StyledField)`
  padding-right: 40px;
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

