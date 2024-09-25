import styled from 'styled-components';

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

export const PermissionMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #666;

  svg {
    margin-right: 0.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #4f46e5;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;