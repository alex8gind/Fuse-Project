import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }
`;

export const BackButton = styled(Link)`
  color: #000;
  text-decoration: none;
  margin-right: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }
`;

export const StepList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StepItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: ${props => props.$clickable ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$clickable ? 1 : 0.5};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$clickable ? '#f0f0f0' : 'transparent'};
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

export const StepIcon = styled.div`
  margin-right: 1rem;
  color: ${props => props.$completed ? '#4caf50' : '#1877f2'};
`;

export const StepText = styled.span`
  flex-grow: 1;
`;

export const StepAction = styled.div`
  color: #1877f2;
`;

export const NextButton = styled.button`
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

export const WhyLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #166fe5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// New components
export const StepNumber = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.25rem;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem;
  }
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;