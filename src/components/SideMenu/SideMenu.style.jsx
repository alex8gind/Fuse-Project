import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;


export const SidebarContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 10px;
  width: 280px;
  height: 75vh;
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 2em 1em;
  border-radius: 1vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(${props => props.$isOpen ? '0' : '-115%'});
  transition: transform 0.2s ease-in-out;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
  top: 90px;
  left: 15px;
  width: 300px;
  height: 80vh;
  }

`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #222;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 1rem;
  gap: 1.5rem;
  box-sizing: border-box;
`;

export const UserAvatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primaryOrange};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  background-image: url(${props => props.$photoUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

export const UserName = styled.h2`
  padding: 0 1em;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  /* background-color: greenyellow; */

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.6rem;
  }
`;

export const NavLink = styled(Link)`
  padding: 0.8em 1em;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.4rem;
  font-weight: 500;
  transition: color 0.3s;
  /* background-color: yellowgreen; */

  &:hover {
    color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0.8em 1em;
    font-size: 1.6rem;
  }
`;


export const LogoutButton = styled.button`
  margin-top: auto;
  padding: .7em .6em;
  background-color: #f1641e;
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 20vh;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.6rem;
  }
`;