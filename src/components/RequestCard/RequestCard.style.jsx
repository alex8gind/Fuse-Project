// RequestCard.style.jsx
import styled from 'styled-components';

export const RequestCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.background};
  transition: background-color 0.2s;
  gap: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;

export const PersonalId = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const RequestStatus = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primaryOrange};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AcceptButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const DeclineButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

export const MessageContainer = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;