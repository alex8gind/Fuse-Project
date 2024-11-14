import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;


export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 12px 12px;
  background-color: ${props => props.theme.colors.background};
  display: flex;

  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 40px 40px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 100px 60px 60px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 16px;
  padding: 4em 2em;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
 

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 24px;
    max-width: 90%;
    border-radius: 20px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 32px;
    max-width: 1200px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
  padding: 0.5em 1em;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid ${props => `${props.theme.colors.text}10`};
`;

export const UserPhoto = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50vh;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.orange_pale};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 120px;
    height: 120px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .5em;
  padding: 0.5em 1em;
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const UserStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text};
  padding: 4px 10px;
  background: ${props => props.theme.colors.orange_pale};
  border-radius: 20px;
  width: fit-content;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`;

export const ReportBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid white;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  padding: 0.4em 0.8em;
  border-radius: 1.1vh;
  font-size: 1.3rem;
  font-family: ${props => props.theme.fonts.main};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.background};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.7rem;
    padding: 1em 1.7em;
    width: 40%;
  }
`;

export const BlockedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${props => `${props.theme.colors.error}15`};
  color: ${props => props.theme.colors.error};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

export const BlockButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #d11919c2;
  color: ${props => props.theme.colors.text};
  border: 2px solid white;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  padding: 0.4em 0.8em;
  border-radius: 1.1vh;
  font-size: 1.3rem;
  font-family: ${props => props.theme.fonts.main};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.background};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.7rem;
    padding: 1em 1.7em;
    width: 40%;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  width: 100%;
 
  

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: ${props => props.children.length > 2 ? '1fr 1fr' : '1fr'};
    gap: 2em;
    max-width: 800px; 
    margin: 0 auto; 
    justify-items: center; 
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid white;
  outline: 2px solid ${props => props.theme.colors.navigation_button};
  padding: 0.4em 0.8em;
  border-radius: 1.1vh;
  font-size: 1.3rem;
  font-family: ${props => props.theme.fonts.main};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: all 0.3s ease;
  width: ${props => props.$isDocument ? '100%' : 'auto'}; // Add this for document buttons

  &:hover {
    background-color: ${props => !props.disabled && props.theme.colors.primaryOrange};
    color: ${props => !props.disabled && props.theme.colors.background};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.7rem;
    padding: 1em 1.7em;
  }
`;


export const RequestMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background-color: ${props => `${props.theme.colors.background}`};
  border-radius: 12px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;

  svg {
    color: ${props => props.theme.colors.orange_main};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: 14px 20px;
  }
`;

export const MessageContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${props => props.$type === 'error' ? 
    `${props.theme.colors.error}10` : 
    `${props.theme.colors.orange_main}10`};
  color: ${props => props.$type === 'error' ? 
    props.theme.colors.error : 
    props.theme.colors.orange_main};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: 14px 20px;
  }
`;