import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 300px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2rem;
    max-width: 400px;
  }
`;

export const IconWrapper = styled.div`
  background-color: ${props => props.$success ? '#4CAF50' : '#F44336'};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 64px;
    height: 64px;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const Message = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;