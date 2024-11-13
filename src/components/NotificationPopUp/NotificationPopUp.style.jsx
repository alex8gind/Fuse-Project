// components/NotificationsPopup/NotificationsPopup.style.jsx
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 380px;
  max-height: 500px;
  background: ${props => props.theme.colors.navigation_bg};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 1000;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    right: 0;
    top: 0;
    height: 100vh;
    max-height: none;
    border-radius: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const NotificationList = styled.div`
  max-height: calc(500px - 60px);
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-height: calc(100vh - 60px);
  }
`;

export const NotificationItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  background: ${props => props.$unread ? props.theme.colors.background : 'transparent'};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }
`;

export const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${props => props.theme.colors.primaryOrange}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;

  svg {
    color: ${props => props.theme.colors.primaryOrange};
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
  background-color: ${props => props.theme.colors.background};
`;

export const UserName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const NotificationMessage = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-left: auto;
  padding-left: 8px;
  white-space: nowrap;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ButtonBase = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AcceptButton = styled(ButtonBase)`
  background: ${props => props.theme.colors.primaryOrange};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const DeclineButton = styled(ButtonBase)`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.backgroundHover};
  }
`;

export const UnreadIndicator = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${props => props.theme.colors.primaryOrange};
`;

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: ${props => props.theme.colors.textSecondary};
  gap: 12px;

  svg {
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  margin: -8px;
  border-radius: 6px;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }
`;

export const ReadAllButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primaryOrange};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 6px;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.theme.colors.background};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const StatusIcon = styled(IconWrapper)`
  background: ${props => {
    switch(props.type) {
      case 'connection_accepted':
        return `${props.theme.colors.primaryOrange}20`;
      case 'connection_declined':
        return `${props.theme.colors.error}20`;
      default:
        return `${props.theme.colors.primaryOrange}20`;
    }
  }};

  svg {
    color: ${props => {
      switch(props.type) {
        case 'connection_accepted':
          return props.theme.colors.primaryOrange;
        case 'connection_declined':
          return props.theme.colors.error;
        default:
          return props.theme.colors.primaryOrange;
      }
    }};
  }
`;

export const StatusMessage = styled(NotificationMessage)`
  color: ${props => {
    switch(props.type) {
      case 'connection_accepted':
        return props.theme.colors.primaryOrange;
      case 'connection_declined':
        return props.theme.colors.error;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
`;