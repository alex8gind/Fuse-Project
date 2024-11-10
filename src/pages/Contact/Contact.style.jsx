import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 95%;
  min-height: calc(86vh - 100px);
  margin: 105px auto;
  background-color: ${props => props.theme.colors.navigation_bg};
  color: ${props => props.theme.colors.text};
  border-radius: 20px;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2em;
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3em;
    margin: 30px auto;
    max-width: 85%;
    min-height: 86vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  /* background-color: GREEN; */
  width: 95%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 65%;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 40%;
  }
`;


export const UserPhoto = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  /* background-color: blue; */
`;

export const UserInfo = styled.div`
  flex-grow: 1;
  display:flex;
  flex-direction: column;
  /* align-items: center; */
  /* background-color: yellow; */
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const UserStatus = styled.p`
  margin: 5px 0 0;
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const ReportBtn = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.text};
  font-size: 1em;
  border: none;
  padding: 0.8em 1.2em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.errorDark};
  }
`;

export const RequestMessage = styled.div`
  color: ${props => props.theme.colors.primaryOrange};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
`;


export const BlockedBadge = styled.span`
  background-color: ${props => props.theme.colors.error};
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8em;
  margin-left: 10px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: ${props => props.children.length > 1 ? 'space-between' : 'flex-end'};
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;


export const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.background};
  font-size: 1em;
  border: none;
  padding: 0.8em 1.2em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryOrangeDark};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export const MessageContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  color: ${props => props.$type === 'error' ? 
    props.theme.colors.error : 
    props.theme.colors.primaryOrange};
  background-color: ${props => props.$type === 'error' ? 
    `${props.theme.colors.error}10` : 
    `${props.theme.colors.primaryOrange}10`};
`;
