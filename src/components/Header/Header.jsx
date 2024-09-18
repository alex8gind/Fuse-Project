import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, Search } from 'lucide-react';
import Logo from '../Logo/Logo.jsx';
import {
  HeaderWrapper, Container, MenuButton, LogoWrapper, DesktopNav, NavList, NavItem, 
  SearchWrapper, ButtonsIcon, TabletMenu, SearchInput, CloseButton, SearchIcon, 
  DesktopIcons, TabletIcons, MobileIcons
} from './Header.style.jsx';

const Header = () => {
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});
  const location = useLocation();

  const toggleTabletMenu = () => {
    setIsTabletMenuOpen(!isTabletMenuOpen);
    setActiveButtons(prev => ({ ...prev, menu: !prev.menu }));
  };

  const handleButtonClick = (buttonName) => {
    setActiveButtons(prev => ({
      ...prev,
      [buttonName]: !prev[buttonName]
    }));
  };

  return (
    <HeaderWrapper>
      <Container>
        <MenuButton 
          onClick={toggleTabletMenu} 
          aria-expanded={isTabletMenuOpen} 
          aria-label="Toggle tablet menu"
          $isActive={activeButtons.menu}
        >
          <Menu size={25} />
        </MenuButton>

        <LogoWrapper>
          <Logo />       
        </LogoWrapper>

        <DesktopNav>
          <NavList>
            <NavItem $isActive={location.pathname === '/'}><Link to="/">Home</Link></NavItem>
            <NavItem $isActive={location.pathname === '/profile'}><Link to="/profile">My Profile</Link></NavItem>
            <NavItem $isActive={location.pathname === '/documents'}><Link to="/documents">Documents</Link></NavItem>
            <NavItem $isActive={location.pathname === '/connections'}><Link to="/connections">Connections</Link></NavItem>
            <NavItem $isActive={location.pathname === '/settings'}><Link to="/settings">Settings</Link></NavItem>
            <NavItem $isActive={location.pathname === '/helpers'}><Link to="/helpers">Helpers</Link></NavItem>
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
            <Bell size={25} />
          </ButtonsIcon>
        </DesktopIcons>

        <TabletIcons>
          <ButtonsIcon 
            aria-label="Search"
            onClick={() => handleButtonClick('search')}
            $isActive={activeButtons.search}
          >
            <Search size={25} />
          </ButtonsIcon>
          <ButtonsIcon 
            aria-label="Notifications"
            onClick={() => handleButtonClick('notifications')}
            $isActive={activeButtons.notifications}
          >
            <Bell size={25} />
          </ButtonsIcon>
        </TabletIcons>

        <MobileIcons>
          <ButtonsIcon 
            aria-label="Notifications"
            onClick={() => handleButtonClick('notifications')}
            $isActive={activeButtons.notifications}
          >
            <Bell size={25} />
          </ButtonsIcon>
        </MobileIcons>
      </Container>

      {isTabletMenuOpen && (
        <TabletMenu>
          <nav>
            <ul>
              <li><Link to="/" onClick={toggleTabletMenu}>Home</Link></li>
              <li><Link to="/profile" onClick={toggleTabletMenu}>My Profile</Link></li>
              <li><Link to="/documents" onClick={toggleTabletMenu}>Documents</Link></li>
              <li><Link to="/connections" onClick={toggleTabletMenu}>Connections</Link></li>
              <li><Link to="/settings" onClick={toggleTabletMenu}>Settings</Link></li>
              <li><Link to="/helpers" onClick={toggleTabletMenu}>Helpers</Link></li>
            </ul>
          </nav>
          <CloseButton onClick={toggleTabletMenu} aria-label="Close menu">
            <X size={24} />
          </CloseButton>
        </TabletMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;