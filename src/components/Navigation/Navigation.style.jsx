import styled from 'styled-components';

export const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.navigation_bg};
  z-index: 100;
  padding: 0.5rem 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const NavItem = styled.li`
  flex: 1;
  text-align: center;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props => props.$isActive 
      ? props.theme.colors.navigation_clicked_button
      : props.theme.colors.navigation_button};
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0.5rem 0;
    width: 100%;
    height: 100%;

    &:hover {
      color: ${props => props.theme.colors.navigation_clicked_button};
    }
  }
`;

export const IconLabel = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;


