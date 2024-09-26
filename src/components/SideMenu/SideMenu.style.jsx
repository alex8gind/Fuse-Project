import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const UserAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background};
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  margin-bottom: 10px;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.navigation_button};
  }
`;

export const LogoutButton = styled.button`
  margin-top: auto;
  padding: 10px 15px;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.text};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.navigation_button};
  }
`;