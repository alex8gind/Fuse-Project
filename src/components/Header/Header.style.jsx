import styled, { css } from 'styled-components';
import { Search } from 'lucide-react'; 

export const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.header};
  color: ${props => props.theme.colors.text};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const LogoWrapper = styled.div`
  display: flex;
  /* flex-basis: auto; */
  /* flex-grow: 2; */
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`;


export const NavList = styled.ul`
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  gap: 1.5rem;
  list-style-type: none;
`;

export const NavItem = styled.li`
  a {
    color: ${props => props.$isActive 
      ? props.theme.colors.navigation_clicked_button
      : props.theme.colors.navigation_button};
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.navigation_clicked_button};
    }
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 2rem;
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.colors.icons};
  width: 10rem;

  &::placeholder {
    color: ${props => props.theme.colors.icons};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }`;


const baseButtonStyle = css`
  padding: 0.75rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: ${props => props.$isActive 
    ? props.theme.colors.navigation_clicked_button
    : props.theme.colors.navigation_button};
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.navigation_clicked_button};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ButtonsIcon = styled.button`
  ${baseButtonStyle}
`;

export const SearchIcon = styled(Search)`
  ${baseButtonStyle}

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    position: absolute;
    left: 7%;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
  }
`;

export const DesktopIcons = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    gap: 1rem;
  }
`;

export const TabletIcons = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

export const MobileIcons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  ${baseButtonStyle}
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
`;

export const TabletMenu = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 16rem;
  height: calc(100vh - 4rem);
  background-color: #2563eb;
  z-index: 50;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }

  nav ul {
    list-style-type: none;
    padding: 1rem;
    margin: 0;
  }

  nav ul li {
    margin-bottom: 1rem;
  }

  nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 1.125rem;

    &:hover {
      color: #e5e7eb;
    }
  }
`;

export const CloseButton = styled.button`
  ${baseButtonStyle}
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;