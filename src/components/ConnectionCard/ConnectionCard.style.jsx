import styled from 'styled-components';


export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.background};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const PersonalId = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

export const LastInteraction = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const Status = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.primary};
`;

export const BlockedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
