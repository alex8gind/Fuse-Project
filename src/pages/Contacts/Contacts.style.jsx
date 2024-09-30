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
  gap: 20px;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2em;
    max-width: 800px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;


export const UserPhoto = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
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

export const InteractionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InteractionItem = styled.div`
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 5px;
`;

