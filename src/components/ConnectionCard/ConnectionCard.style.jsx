import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 16px;
    gap: 16px;
    border-radius: 12px;
  }
`;

export const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.orange_primary};
  transition: border-color 0.2s ease;

  ${Card}:hover & {
  border-color: ${props => props.theme.colors.orange_pale};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
`;

export const UserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0; // Enables text truncation in children

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 4px;
  }
`;

export const PersonalId = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

export const LastInteraction = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 70px; // Ensures consistent width for status indicators

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 6px;
    min-width: 80px;
  }
`;

export const ConnectionStatus = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;

  ${props => {
    switch(props.status) {
      case 'accepted':
        return `
          background-color: #10B98120;
          color: #10B981;
        `;
      case 'pending':
        return `
          background-color: #F59E0B20;
          color: #F59E0B;
        `;
      default:
        return `
          background-color: #6B728020;
          color: #6B7280;
        `;
    }
  }}

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
    padding: 4px 10px;
  }
`;

export const Status = styled.span`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

export const BlockedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF63471A;
  padding: 6px;
  border-radius: 8px;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 8px;
    border-radius: 10px;
  }
`;