import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${props => props.theme.colors.header};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 400px;
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 2rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.navigation_button};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.navigation_clicked_button};
  }
`;

// export const CloseButton = styled(BackButton)``;

export const Title = styled.h1`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.aqua};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primaryOrange};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 2rem;
  }
`;

export const DropZone = styled.div`
  border: 2px dashed ${props => props.theme.colors.icons};
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primaryOrange};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
`;

export const UploadIcon = styled.div`
  color: ${props => props.theme.colors.icons};
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;

  svg {
    width: 36px;
    height: 36px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 1rem;
    svg {
      width: 48px;
      height: 48px;
    }
  }
`;

export const DropText = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  font-size: 0.875rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 1rem;
    margin: 1.5rem 0;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  font-family: ${props => props.theme.fonts.main};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.icons};
    cursor: not-allowed;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const FileList = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 1rem;
  }
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.header};
  }
`;

export const FileName = styled.p`
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

export const FileSize = styled.span`
  color: ${props => props.theme.colors.icons};
  font-size: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

export const RemoveButton = styled.button`
  color: ${props => props.theme.colors.error};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${props => props.theme.colors.navigation_bg};
  border-radius: 2px;
  margin: 0.75rem 0;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress}%;
    background-color: ${props => props.theme.colors.primaryOrange};
    transition: width 0.3s ease;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 4px;
    margin: 1rem 0;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.icons};
  font-size: 0.75rem;
  margin: 0.5rem 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.875rem;
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

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin: 1.5rem 0;
  }
`;

export const CaptureButton = styled(ActionButton)`
  margin-top: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 1rem;
  }
`;

export const InstructionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1.5rem 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin: 2rem 0;
  }
`;

export const InstructionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.navigation_bg};
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const InstructionIcon = styled.span`
  color: ${props => props.theme.colors.primaryOrange};
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const InstructionText = styled.p`
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.main};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

export const NotificationOverlay = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  width: calc(100% - 32px);
  animation: slideIn 0.3s ease-out;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    top: 20px;
    right: 20px;
    width: auto;
  }

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
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 0.875rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem 1.5rem;
    min-width: 300px;
    font-size: 1rem;
  }
`;

export const NotificationClose = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.25rem;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
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
  padding: 1rem;
`;

export const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.header};
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 2rem;
    max-width: 400px;
    width: 90%;
  }
`;

export const PopupMessage = styled.p`
  text-align: center;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.main};
  font-size: 0.875rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 1rem;
  }
`;

export const PopupButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
  font-family: ${props => props.theme.fonts.main};
  
  background-color: ${props => props.$delete 
    ? props.theme.colors.error
    : props.theme.colors.navigation_bg};
  
  color: ${props => props.$delete 
    ? 'white'
    : props.theme.colors.text};

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors.icons};
  font-size: 0.875rem;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.icons};
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;