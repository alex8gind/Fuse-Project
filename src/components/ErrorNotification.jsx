import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  padding: 15px 20px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.background};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease;
  z-index: 1000;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
`;

const ErrorNotification = ({ message, type, onClose }) => (
  <NotificationContainer type={type}>
    <Message>{message}</Message>
    <CloseButton onClick={onClose}>
      <X size={18} />
    </CloseButton>
  </NotificationContainer>
);

export default ErrorNotification;