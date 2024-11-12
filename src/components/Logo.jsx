import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 64px;
  text-decoration: none;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 160px;
    height: 64px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 170px;
    height: 72px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 180px;
    height: 80px;
  }
`;

const LogoSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const BackgroundSquare = styled.rect`
  width: 28px;
  height: 31px;
  x: 10.5px;
  y: 3px;
  fill: ${props => props.theme.colors.orange_primary};
  rx: 8;  
  ry: 8; 

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 32px;
    height: 34px;
    x: 9px;
    y: 2px;
 
  }
`;

const FirstLetter = styled.text`
  font-family: ${props => props.theme.fonts.logo};
  font-weight: 700;
  fill: ${props => props.theme.colors.background_second}; 
  text-anchor: middle;
  dominant-baseline: central;
  font-size: 32px; 
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 32px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 34px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 36px;
  }
`;

const RemainingLetters = styled.text`
  font-family: ${props => props.theme.fonts.logo};
  font-weight: 700;
  fill: ${props => props.theme.colors.orange_primary};
  text-anchor: start;
  dominant-baseline: central;
  font-size: 32px; 
  letter-spacing: -1px;
  
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 32px;
  
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 34px;
    
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 36px;
   
  }
`;


const Logo = () => {
  return (
    <LogoContainer to="/">
      <LogoSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40">

        <BackgroundSquare/>

        <FirstLetter x="25" y="20" fontSize="24">
          F
        </FirstLetter>
    
        <RemainingLetters x="40" y="20" fontSize="24">
          USE
        </RemainingLetters>
      </LogoSVG>
    </LogoContainer>
  );
};

export default Logo;