import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { UserContext } from '../../contexts/user.context';
import { 
  Overlay, 
  SidebarContainer, 
  CloseButton, 
  UserContainer, 
  UserAvatar, 
  UserName, 
  NavLink, 
  LogoutButton } from './SideMenu.style';

  const SideMenu = ({ isOpen, onClose }) => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
  
    const handleNavClick = () => {
      onClose();
    }; 
    
    const handleLogout = async () => {
      try {
        await logout();
        onClose(); 
        navigate('/login'); 
      } catch (error) {
        console.error('Logout failed:', error);
        // Optionally, you can show an error message to the user here
      }
    };
  
  return (
    <>
     <Overlay $isOpen={isOpen} onClick={onClose} />   
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <UserContainer> 
          <UserAvatar $photoUrl={user?.profilePicture}>
            {!user?.profilePicture && (user?.firstName?.charAt(0) || 'U')}
          </UserAvatar>
          <UserName>{user?.firstName} {user?.lastName}</UserName>
        </UserContainer>
        <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
        <NavLink to="/profile" onClick={handleNavClick}>Profile</NavLink>
        <NavLink to="/connections" onClick={handleNavClick}>Connections</NavLink>
        <NavLink to="/docs" onClick={handleNavClick}>Documents</NavLink>
        <NavLink to="/settings" onClick={handleNavClick}>Settings</NavLink>
        <NavLink to="/contact" onClick={handleNavClick}>Contact Us</NavLink>
        <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
    </SidebarContainer>
  </>
  );
};

export default SideMenu;