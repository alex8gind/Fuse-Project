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
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.icons};
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
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
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  margin-bottom: 1rem;
`;

export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
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