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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 1.5rem;
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
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OptionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const OptionIcon = styled.span`
  margin-right: 1rem;
  color: #6366f1;
`;