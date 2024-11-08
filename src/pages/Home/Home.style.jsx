import styled from 'styled-components';
import { ShieldCheck } from 'lucide-react'

export const PageContainer = styled.div`
  width: 95%;
  min-height: calc(86vh - 100px); // Adjust 100px to match your Navigation height
  margin: 90px auto;
  background-color: ${props => props.theme.colors.navigation_bg};
  color: ${props => props.theme.colors.text};
  border-radius: 20px;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  overflow-y: auto; 

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
  }
`;

export const UserInfo = styled.div`
  display: block;
  height: fit-content;
  width: fit-content;
  margin: 0;
  position: relative;
  background-color: transparent; 
`;

export const UserPhoto = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 9em;
  width: 9em;
  border: 2px solid white;
  border-radius: 100vh;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  margin: 0;
  background-color: ${props => props.theme.colors.background};
  background-image: url(${props => props.$photoUrl || 'default-profile-picture.jpg'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 11em;
    width: 11em;
  }
`;

export const VerifiedBadge = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
  width: 2em;
  border: 2px solid ${props => props.theme.colors.primaryOrange};
  border-radius: 100vh;
  background-color: ${props => props.theme.colors.primaryOrange};
  bottom: 0;
  right: 10px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    border: 2px solid ${props => props.theme.colors.navigation_bg};
    outline: 2px solid ${props => props.theme.colors.primaryOrange};
    height: 2.3em;
    width: 2.3em;
  }
`;

export const VerifiedIcon = styled(ShieldCheck)`
  color: ${props => props.theme.colors.navigation_bg};
  font-size: 2.5em;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 4em;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1.6em;
  padding: 1.3em 1.5em;
  background-color: transparent;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 30px;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid white;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  padding: 0.4em 0.8em;
  border-radius: 1.1vh;
  font-size: 1.3rem;
  font-family: ${props => props.theme.fonts.main};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? '0.5' : '1'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => !props.$disabled && props.theme.colors.primaryOrange};
    color: ${props => !props.$disabled && props.theme.colors.background};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.7rem;
    padding: 1em 1.7em;
  }
`;

export const VerifyIdentityButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.navigation_bg};
  outline: 2px solid ${props => props.theme.colors.primaryOrange};
  padding: 0.6em 1.2em;
  font-size: 1.2rem;

  svg {
    stroke-width: 2.5;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
    padding: 0.8em 1.5em;
  }
`;


export const DocumentsButton = styled(Button)`
 padding: 0.5em 1em;
 width: fit-content;
 background-color: ${props => props.theme.colors.primaryOrange};
 color: ${props => props.theme.colors.background};
 border: 2px solid ${props => props.theme.colors.navigation_bg};
 outline: 2px solid ${props => props.theme.colors.primaryOrange};
 border-radius: 1.1vh;
 font-size: 1.3rem;
 font-family: ${props => props.theme.fonts.main};

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.8rem;
    padding: 1em 1.7em;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  background-color: transparent;
  color: ${props => props.theme.colors.primaryOrange};
  border: none;
  padding: 0.5em 1em;
  font-size: 1rem;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.error};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;
