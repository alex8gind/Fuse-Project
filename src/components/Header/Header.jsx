import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, Search } from 'lucide-react';
import Logo from '../Logo/Logo.jsx';
import SideMenu from '../SideMenu/SideMenu.jsx';
import {
  HeaderWrapper, Container, MenuButton, LogoWrapper, DesktopNav, NavList, NavItem, 
  SearchWrapper, ButtonsIcon, SearchInput, SearchIcon, 
  DesktopIcons, TabletIcons, MobileIcons
} from './Header.style.jsx';

const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const location = useLocation();

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
    // setActiveButtons(prev => ({ ...prev, menu: !prev.menu }));
  };

  const handleButtonClick = (buttonName) => {
    setActiveButtons(prev => ({
      ...prev,
      [buttonName]: !prev[buttonName]
    }));
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    // Close the side menu after logout
    setIsSideMenuOpen(false);
  };


  return (
    <>
      <HeaderWrapper>
        <Container>
          <MenuButton 
            onClick={toggleSideMenu} 
            aria-expanded={isSideMenuOpen} 
            aria-label="Toggle side menu"
            // $isActive={activeButtons.menu}
          >
            <Menu size={27} />
          </MenuButton>

          <LogoWrapper>
            <Logo />       
          </LogoWrapper>

          <DesktopNav>
            <NavList>
              <NavItem $isActive={location.pathname === '/'}><Link to="/">Home</Link></NavItem>
              <NavItem $isActive={location.pathname === '/profile'}><Link to="/profile">Profile</Link></NavItem>
              <NavItem $isActive={location.pathname === '/documents'}><Link to="/docs">Documents</Link></NavItem>
              <NavItem $isActive={location.pathname === '/connections'}><Link to="/connections">Connections</Link></NavItem>
              <NavItem $isActive={location.pathname === '/settings'}><Link to="/settings">Settings</Link></NavItem>
            </NavList>
          </DesktopNav>

          <DesktopIcons>
            <SearchWrapper>
              <SearchInput type="text" placeholder="Search..." />
              <SearchIcon size={20} />
            </SearchWrapper>
            <ButtonsIcon 
              aria-label="Notifications" 
              onClick={() => handleButtonClick('notifications')}
              $isActive={activeButtons.notifications}
            >
              <Bell size={27} />
            </ButtonsIcon>
          </DesktopIcons>

          <TabletIcons>
            <ButtonsIcon 
              aria-label="Search"
              onClick={() => handleButtonClick('search')}
              $isActive={activeButtons.search}
            >
              <Search size={27} />
            </ButtonsIcon>
            <ButtonsIcon 
              aria-label="Notifications"
              onClick={() => handleButtonClick('notifications')}
              $isActive={activeButtons.notifications}
            >
              <Bell size={27} />
            </ButtonsIcon>
          </TabletIcons>

          <MobileIcons>
            <ButtonsIcon 
              aria-label="Notifications"
              onClick={() => handleButtonClick('notifications')}
              $isActive={activeButtons.notifications}
            >
              <Bell size={27} />
            </ButtonsIcon>
          </MobileIcons>
        </Container>
      </HeaderWrapper>

      <SideMenu 
        userName="John Doe" // Replace with actual user name
        onLogout={handleLogout}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </>
  );
};

export default Header;