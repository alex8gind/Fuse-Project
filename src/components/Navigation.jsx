import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Users, Settings, Menu, X } from 'lucide-react';
import styled from 'styled-components';

const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2563eb;
  padding: 0.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a, button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const IconLabel = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;


const Navigation = () => {

  return (
    <>
      <MobileNav>
        <NavList>
          <NavItem>
            <Link to="/profile">
              <User size={24} />
              <IconLabel>Profile</IconLabel>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/documents">
              <FileText size={24} />
              <IconLabel>Docs</IconLabel>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/connections">
              <Users size={24} />
              <IconLabel>Connections</IconLabel>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/settings">
              <Settings size={24} />
              <IconLabel>Settings</IconLabel>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/menu">
              <Menu size={24} />
              <IconLabel>Menu</IconLabel>
            </Link>
          </NavItem>
        </NavList>
      </MobileNav>

    </>
  );
};

export default Navigation;