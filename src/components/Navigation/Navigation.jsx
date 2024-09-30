import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FileText, Users, Settings} from 'lucide-react';
import { MobileNav, NavList, NavItem, IconWrapper, IconLabel } from './Navigation.style';

const Navigation = () => {
  const location = useLocation();

  return (
    <MobileNav>
    <NavList>
      <NavItem $isActive={location.pathname === '/profile'}>
        <Link to="/profile">
          <IconWrapper>
            <User size={24} />
          </IconWrapper>
          <IconLabel>Profile</IconLabel>
        </Link>
      </NavItem>
      <NavItem $isActive={location.pathname === '/docs'}>
        <Link to="/documents">
          <IconWrapper>
            <FileText size={24} />
          </IconWrapper>
          <IconLabel>Docs</IconLabel>
        </Link>
      </NavItem>
      <NavItem $isActive={location.pathname === '/connections'}>
        <Link to="/connections">
          <IconWrapper>
            <Users size={24} />
          </IconWrapper>
          <IconLabel>Connections</IconLabel>
        </Link>
      </NavItem>
      <NavItem $isActive={location.pathname === '/settings'}>
        <Link to="/settings">
          <IconWrapper>
            <Settings size={24} />
          </IconWrapper>
          <IconLabel>Settings</IconLabel>
        </Link>
      </NavItem>
    </NavList>
  </MobileNav>
);
};

export default Navigation;