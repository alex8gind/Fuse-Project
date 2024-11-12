import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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
  background-color: ${props => props.theme.colors.backgroundHover};
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
  font-weight: 500;
`;

export const PersonalId = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const RequestStatus = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primaryOrange};
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-left: auto;
`;

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .animate-spin {
    animation: ${spin} 1s linear infinite;
  }
`;

export const AcceptButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const DeclineButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.backgroundHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const MessageContainer = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;