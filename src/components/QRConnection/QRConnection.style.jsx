import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;

export const ModalContent = styled.div`
   background-color: ${props => props.theme.colors.navigation_bg};
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1001; 
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$active ? props.theme.colors.primaryOrange : props.theme.colors.background};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primaryOrange : props.theme.colors.backgroundHover};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: .7rem;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.background_second};
  cursor: pointer;
  padding: 0.1rem;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

export const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

export const QRImage = styled.img`
  width: 256px;
  height: 256px;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.$secondary ? 
    props.theme.colors.background : 
    props.theme.colors.primaryOrange};
  color: ${props => props.$secondary ? 
    props.theme.colors.text : 
    'white'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.error}20;
  color: ${props => props.theme.colors.error};
  border-radius: 8px;
`;

export const ScannerContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  p {
    text-align: center;
    margin-top: 1rem;
    color: ${props => props.theme.colors.icons};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: ${props => props.theme.colors.text};
`;

export const ConfirmationOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.navigation_bg};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export const ConfirmationContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

export const UserPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 12px;
  width: 100%;
`;

export const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${props => props.theme.colors.backgroundHover};
  background-image: url(${props => props.$photoUrl});
  background-size: cover;
  background-position: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UserName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
`;

export const UserPId = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.icons};
`;

export const ConfirmationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;

  svg {
    color: ${props => props.theme.colors.primaryOrange};
  }
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  button {
    flex: 1;
  }
`;

