import React from 'react';
import { X } from 'lucide-react';
import { Overlay, SidebarContainer, CloseButton, UserContainer, UserAvatar, UserName, NavLink, LogoutButton } from './SideMenu.style';

const SideMenu = ({ userName, onLogout, isOpen, onClose }) => {
  return (
    <>
     <Overlay $isOpen={isOpen} onClick={onClose} />   
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <UserContainer> 
          <UserAvatar>{userName.charAt(0)}</UserAvatar>
          <UserName>{userName}</UserName>
        </UserContainer>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/connections">Connections</NavLink>
        <NavLink to="/documents">Documents</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
        <LogoutButton onClick={onLogout}>Log out</LogoutButton>
    </SidebarContainer>
  </>
  );
};

export default SideMenu;