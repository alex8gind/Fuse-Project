import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 56px;
  text-decoration: none;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 140px;
    height: 56px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 150px;
    height: 64px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 160px;
    height: 76px;
  }
`;

const LogoSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const LogoText = styled.text`
  font-family: ${props => props.theme.fonts.logo};
  font-size: 24px;
  font-weight: 700;
  fill: #E86C25;
  text-anchor: middle;
  dominant-baseline: central;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 28px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 32px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 36px;
  }
`;

const Logo = () => {
  return (
    <LogoContainer to="/">
      <LogoSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
        <LogoText x="50" y="20">
          FUSE
        </LogoText>
      </LogoSVG>
    </LogoContainer>
  );
};

export default Logo;