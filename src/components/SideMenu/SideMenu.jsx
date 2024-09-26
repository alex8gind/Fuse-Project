import React from 'react';
import { SidebarContainer, UserAvatar, NavLink, LogoutButton } from './SideMenu.style';

const SideMenu = ({ userName, onLogout, isOpen }) => {
  return (
    <SidebarContainer $isOpen={isOpen}>
      <UserAvatar>{userName.charAt(0)}</UserAvatar>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/connections">Connections</NavLink>
      <NavLink to="/documents">Documents</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/contact">Contact Us</NavLink>
      <LogoutButton onClick={onLogout}>Log out</LogoutButton>
    </SidebarContainer>
  );
};

export default SideMenu;