import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const Message = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.$isSuccess ? '#4CAF50' : '#F44336'};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.$isSuccess ? '#4CAF50' : '#F44336'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.$isSuccess ? '#45a049' : '#d32f2f'};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const RetryLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #6366f1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorDetails = styled.p`
  color: #F44336;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;