// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import styled from 'styled-components';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.header};
  color: ${props => props.theme.colors.text};
  /* border-bottom: 1px solid rgba(206, 196, 196, 0.871); */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
`;

// For Desktop:

const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  gap: 1.5rem;
  list-style-type: none;
`;

const NavItem = styled.li`
  a {
    color: ${props => props.theme.colors.icons};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: #e5e7eb;
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const SearchInput = styled.input`
  background-color: #dfceef;
  color: white;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 9999px;
  border: none;
  width: 16rem;

  &::placeholder {
    color: white;
    
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    display: none;
  }
`;

const SearchIcon = styled(Search)`
  padding: 1rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.icons};
  cursor: pointer;
 

  @media (min-width: 1023px) {
    position: absolute;
    left: 1.50%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ButtonsIcon = styled.button`
  padding: 1rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.icons};
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DesktopIcons = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    gap: 1rem;
  }
`;

// For Tablets:

const TabletMenu = styled.div`
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

  @media (min-width: 768px) and (max-width: 1023px) {
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

const MenuButton = styled.button`
  display: none;
  padding: 1rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.icons};
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
   @media (max-width: 1023px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 9999px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TabletIcons = styled.div`
  display: none;

  @media (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    gap: 1rem;
  }
`;

// For Mobiles:
const MobileIcons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {

  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);

  const toggleTabletMenu = () => setIsTabletMenuOpen(!isTabletMenuOpen);

  return (
    <HeaderWrapper>
      <Container>

        <MenuButton onClick={toggleTabletMenu} aria-expanded={isTabletMenuOpen} aria-label="Toggle tablet menu">
            <Menu size={25} />
        </MenuButton>

        <LogoWrapper>
          <Logo to="/"></Logo>       
        </LogoWrapper>
        

        <DesktopNav>
          <NavList>
            <NavItem><Link to="/">Home</Link></NavItem>
            <NavItem><Link to="/profile">My Profile</Link></NavItem>
            <NavItem><Link to="/documents">Documents</Link></NavItem>
            <NavItem><Link to="/connections">Connections</Link></NavItem>
            <NavItem><Link to="/settings">Settings</Link></NavItem>
            <NavItem><Link to="/helpers">Helpers</Link></NavItem>
          </NavList>
        </DesktopNav>

        <DesktopIcons>
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search..." />
            <SearchIcon size={20} />
          </SearchWrapper>
          <ButtonsIcon  aria-label="Notifications">
            <Bell size={25} />
          </ButtonsIcon>
        </DesktopIcons>

        <TabletIcons>
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search..." />
            <SearchIcon size={25} />
          </SearchWrapper>
          <ButtonsIcon  aria-label="Notifications">
            <Bell size={25} />
          </ButtonsIcon >
        </TabletIcons>

        <MobileIcons>
          {/* <ButtonsIcon  aria-label="Search">
            <Search size={20} />
          </ButtonsIcon > */}
          <ButtonsIcon  aria-label="Notifications">
            <Bell size={25} />
          </ButtonsIcon >
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