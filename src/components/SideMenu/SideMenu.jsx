import React from 'react';
import { X } from 'lucide-react';
import { 
  Overlay, 
  SidebarContainer, 
  CloseButton, 
  UserContainer, 
  UserAvatar, 
  UserName, 
  NavLink, 
  LogoutButton } from './SideMenu.style';

const SideMenu = ({ userName, onLogout, isOpen, onClose }) => {
  const handleNavClick = () => {
    onClose();
  }; 
  
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
        <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
        <NavLink to="/profile" onClick={handleNavClick}>Profile</NavLink>
        <NavLink to="/connections" onClick={handleNavClick}>Connections</NavLink>
        <NavLink to="/docs" onClick={handleNavClick}>Documents</NavLink>
        <NavLink to="/settings" onClick={handleNavClick}>Settings</NavLink>
        <NavLink to="/contact" onClick={handleNavClick}>Contact Us</NavLink>
        <LogoutButton onClick={()=>{onLogout(); onClose(); }}>Log out</LogoutButton>
    </SidebarContainer>
  </>
  );
};

export default SideMenu;