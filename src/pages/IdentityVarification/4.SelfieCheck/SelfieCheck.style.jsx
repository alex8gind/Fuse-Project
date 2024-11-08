import styled from 'styled-components';

export const Container = styled.div`
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
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.navigation_button};
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.navigation_clicked_button};
  }
`;

export const CloseButton = styled(BackButton)``;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  color: ${props => props.theme.colors.primaryOrange};
`;

export const Message = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.$small ? props.theme.colors.icons : props.theme.colors.text};
  font-size: ${props => props.$small ? '0.9rem' : '1.1rem'};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.$small ? '1rem' : '1.2rem'};
  }
`;

export const PermissionMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  padding: 0.5rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.icons};

  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.icons};
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => `${props.theme.colors.primaryOrange}dd`};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.icons};
    cursor: not-allowed;
  }
`;

export const WebcamContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;

  video {
    width: 100%;
    border-radius: 8px;
  }
`;

export const CaptureButton = styled(ActionButton)`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const NotificationOverlay = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const NotificationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.$type === 'success' 
    ? props.theme.colors.primaryOrange 
    : props.theme.colors.error};
  color: ${props => props.theme.colors.navigation_bg};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 0.875rem;
  min-width: 300px;
`;

export const NotificationClose = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.navigation_bg};
  padding: 0.25rem;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const FileList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  gap: 1rem;
`;

export const PhotoPreview = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

export const PhotoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FileName = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const FileSize = styled.span`
  color: ${props => props.theme.colors.icons};
  font-size: 0.75rem;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

export const PopupMessage = styled.p`
  text-align: center;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.text};
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
`;

export const PopupButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.$delete 
    ? props.theme.colors.error 
    : props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.navigation_bg};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const VerificationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.error};
  padding: 1em;
  border-radius: 8px;
  margin: 1em 0;
  font-size: 0.9rem;
  width: 100%;

  svg {
    color: ${props => props.theme.colors.error};
  }
`;

