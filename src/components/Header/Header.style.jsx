import styled, { css } from 'styled-components';
import { Search } from 'lucide-react'; 

export const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.header};
  color: ${props => props.theme.colors.text};
  padding: 0 0.5em;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  /* background-color: purple; */

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    position: static;
    padding: 0 3em;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2rem 0;
  gap: 1rem;
  /* background-color: green; */

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0.5em 1em;
    justify-content: space-evenly;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex: 0 1 auto; // Don't grow, can shrink, auto basis
  align-items: center;
  height: 75px; 
  justify-content: center;
  /* background-color: red; */

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    height: 75px;
    width: 100%;
    justify-content: center;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 78px;
    width: 100%;
    justify-content: center;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    height: 85px;
    width: fit-content;
    justify-content: flex-start;
  }

  /* Ensure the logo link takes full height */
  a {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const DesktopNav = styled.nav`
  display: none;
  padding: 0.5rem;
  /* background-color: blue; */

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    justify-content: flex-start;
    flex: 1 1 auto; // Can grow and shrink, auto basis
  }
`;


export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: auto;
  flex-grow: 1;
  gap: 1.5em;
  list-style-type: none;
  /* background-color: green; */
`;

export const NavItem = styled.li`
  a {
    color: ${props => props.$isActive 
      ? props.theme.colors.primaryOrange
      : props.theme.colors.navigation_clicked_button};
    font-size: 1.5em;
    text-decoration: none;
    padding: .5em;
    border-radius: 10vh;
    transition: color 0.1s ease, background-color 0.1s ease;

    ${props => props.$isActive && css`
      color: ${props.theme.colors.primaryOrange};
    `}
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  /* background-color: green; */
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 2.5rem; // Increased left padding to accommodate the icon
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.colors.icons};
  width: 17em;

  &::placeholder {
    color: ${props => props.theme.colors.icons};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;


const baseButtonStyle = css`
  padding: 1rem;
  border-radius: 100vh;
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
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.icons};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover, &:focus {
    color: ${props => props.theme.colors.primaryOrange};
    background-color: ${props => props.theme.colors.primaryOrange}20; // 20 is for 12.5% opacity
  }

  &:active {
    background-color: ${props => props.theme.colors.primaryOrange}40; // 40 is for 25% opacity
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    left: 0.75rem;
  }
`;

export const DesktopIcons = styled.div`
  display: none;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
    gap: 1rem;
    flex: 0 1 auto; // Don't grow, can shrink, auto basis
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

export const UnreadBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  padding: 2px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(25%, -25%);
`;

