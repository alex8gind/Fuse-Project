import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Oops! The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </Description>
        <ButtonGroup>
          <BackButton onClick={() => navigate(-1)}>
            Go Back
          </BackButton>
          <HomeButton onClick={() => navigate('/')}>
            Go Home
          </HomeButton>
        </ButtonGroup>
        <Illustration>
          <Circle />
          <Circle />
          <Circle />
        </Illustration>
      </Content>
    </Container>
  );
};

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  margin: 0;
  background: linear-gradient(45deg, ${props => props.theme.colors.primaryOrange}, ${props => props.theme.colors.error});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulse} 2s infinite ease-in-out;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  color: ${props => props.theme.colors.text};
  margin: 20px 0;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.primaryOrange};

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrange}10;
  }
`;

const HomeButton = styled(Button)`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;

  &:hover {
    box-shadow: 0 5px 15px ${props => props.theme.colors.primaryOrange}40;
  }
`;

const Illustration = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primaryOrange};
  animation: ${float} 2s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export default PageNotFound;