import styled from 'styled-components';
import { Field, Form } from 'formik';

export const StyledForm = styled(Form)`
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  width: 100%;
  max-width: 350px;
  height: 95vh;
  margin: 2rem auto;
  padding: 2rem;
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

export const LogoContainer = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em; 

  a {
    width: 220px;  
    height: 96px; 

    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      width: 220px;
      height: 96px;
    }

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      width: 240px;
      height: 106px;
    }
  }
`;

export const Title = styled.h1`   
  color: ${props => props.theme.colors.text_pale};
  text-align: center;
  font-size: 1.2rem;
  font-family: ${props => props.theme.fonts.main};
  margin: 0;
  padding: 0.2em;
  padding-bottom: .6em;
`;

export const FieldWrapper = styled.div`
  width: 100%;
  margin-bottom: .7em;
  /* background-color: lime; */
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid ${props => (props.$error && props.$touched ? props.theme.colors.error : '#ddd')};
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: white;
  color: ${props => props.theme.colors.text_main};

  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? props.theme.colors.error : props.theme.colors.orange_primary)};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 59, 48, 0.2)' : 'rgba(232, 108, 37, 0.2)')};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const StyledSelect = styled(Field)`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid ${props => (props.$error && props.$touched ? props.theme.colors.error : '#ddd')};
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: white;
  color: ${props => props.theme.colors.text_main};
  appearance: none; 
  cursor: pointer;


  &:focus {
    outline: none;
    border-color: ${props => (props.$error && props.$touched ? props.theme.colors.error : props.theme.colors.orange_primary)};
    box-shadow: 0 0 0 2px ${props => (props.$error && props.$touched ? 'rgba(255, 59, 48, 0.2)' : 'rgba(232, 108, 37, 0.2)')};
  }

  option {
    padding: 1.2rem;
    font-size: 1.1rem;
    background-color: white;
    color: ${props => props.theme.colors.text_main};
    min-height: 2.5rem;
    display: flex;
    align-items: center;
  }

  option[value=""] {
    color: #757575;
  }

  /* Dropdown menu styles */
  &::-webkit-select-menu {
    margin-top: 0;
    padding: 0.5rem 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

    /* Hover effect for options */
    option:hover,
    option:focus {
    background-color: ${props => props.theme.colors.orange_primary};
    color: white;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 14px;

    option {
      font-size: 14px;
      padding: 1.2rem;
    }
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  /* Custom dropdown arrow */
  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.text_main};
    pointer-events: none;
  }

  /* Style for open dropdown */
  select:focus + &::after {
    transform: translateY(-50%) rotate(180deg);
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
  font-size: 0.9em;
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
  width: 98%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.orange_primary};
  color: white;
  border: none;
  border-radius: 10vh;
  font-size: 1.2rem;
  font-family: ${props => props.theme.fonts.main};
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
  padding-top: 1rem;  
  text-align: center;
  color: ${props => props.theme.colors.primaryOrange};
  text-decoration: none;
  font-size: 1rem;

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



