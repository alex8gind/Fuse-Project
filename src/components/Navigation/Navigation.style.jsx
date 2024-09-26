import styled from 'styled-components';

export const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.navigation_bg};
  z-index: 100;
  padding: 1rem;
  height: 80px; 

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const NavItem = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

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
    padding: 8px 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  
    &:hover {
      color: ${props => props.theme.colors.navigation_clicked_button};
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px; // Fixed height for icon container
  margin-bottom: 4px;
`;

export const IconLabel = styled.span`
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: 1.2;
`;
