import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 90%;
  max-width: 320px;
  margin: 1rem auto;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: fit-content;
    max-width: 400px;

    margin: 2rem auto;
    padding: 2rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
  }
`;

export const IconWrapper = styled.div`
  background-color: #4CAF50;
  border-radius: 50%;
  padding: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  padding: 0.3rem;
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;

export const Message = styled.p`
  padding: 0;
  padding-bottom: 0.75rem;
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  line-height: 1.4;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding-bottom: 1rem;
    line-height: 1.5;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 12px;
  width: 100%;
  flex: 1;
  border-bottom: 1px solid #c3bdbd;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

export const CLink = styled(Link)`
  color: #2196F3;
  text-decoration: none;
  font-size: 0.8rem;
  padding-left: 0.3rem;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding-left: 0.5rem;
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

export const InfoMessage = styled(MessageContainer)`
  background-color: #e1f5fe;
  color: #0288d1;
  border: 1px solid #b3e5fc;
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
