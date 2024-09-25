import styled, { keyframes } from 'styled-components';

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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export const Message = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.$small ? '#666' : '#000'};
  font-size: ${props => props.$small ? '0.9rem' : '1.1rem'};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.$small ? '1rem' : '1.2rem'};
  }
`;

const progressAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin: 2rem 0 1rem;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    background-color: #6366f1;
    animation: ${progressAnimation} 3s linear infinite;
  }
`;

export const ProgressText = styled.p`
  text-align: center;
  color: #6366f1;
  font-size: 0.9rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;