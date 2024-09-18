import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FileText, Users, Settings} from 'lucide-react';
import { MobileNav, NavList, NavItem, IconLabel } from './Navigation.style';

const Navigation = () => {
  const location = useLocation();

  return (
    <MobileNav>
      <NavList>
        <NavItem $isActive={location.pathname === '/profile'}>
          <Link to="/profile">
            <User size={24} />
            <IconLabel>Profile</IconLabel>
          </Link>
        </NavItem>
        <NavItem $isActive={location.pathname === '/documents'}>
          <Link to="/documents">
            <FileText size={24} />
            <IconLabel>Docs</IconLabel>
          </Link>
        </NavItem>
        <NavItem $isActive={location.pathname === '/connections'}>
          <Link to="/connections">
            <Users size={24} />
            <IconLabel>Connections</IconLabel>
          </Link>
        </NavItem>
        <NavItem $isActive={location.pathname === '/settings'}>
          <Link to="/settings">
            <Settings size={24} />
            <IconLabel>Settings</IconLabel>
          </Link>
        </NavItem>
      </NavList>
    </MobileNav>
  );
};

export default Navigation;