import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import QRConnection from './QRConnection/QRConnection'; 
import { ConnectionContext } from '../contexts/connection.context';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: ${props => props.$isContactsPage ? 'row' : 'column'};
  justify-content: ${props => props.$isContactsPage ? 'space-between' : 'center'};
  align-items: center;
  gap: ${props => props.$isContactsPage ? '0.5em' : '.8em'};
  padding: ${props => props.$isContactsPage ? '10px 15px' : '20px'};
  border-radius: 2vh;
  width: ${props => props.$isContactsPage ? 'auto' : '300px'};
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: ${props => props.$isContactsPage ? 'auto' : '400px'};
    gap: ${props => props.$isContactsPage ? '1em' : '1em'};
  }
`;

const Title = styled.h3`
  margin: 0;
  padding: ${props => props.$isContactsPage ? '0' : '.4em'};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.$isContactsPage ? '1em' : '1.5em'};
  display: ${props => props.$isContactsPage ? 'none' : 'block'};
`;


const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  display: ${props => props.$isContactsPage ? 'none' : 'block'};
`;

const Input = styled.input`
  width: 90%;
  padding: .7em;
  font-size: 1em;
  border-radius: 1vh;
  box-sizing: border-box;
 
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primaryOrange};
  color: ${props => props.theme.colors.background};
  font-size: ${props => props.$isContactsPage ? '0.8em' : '1em'};
  padding: ${props => props.$isContactsPage ? '.3em .6em' : '.5em 1em'};
  border: none;
  border-radius: 1vh;
  cursor: pointer;
  white-space: nowrap;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.$isContactsPage ? '0.9em' : '1.2em'};
    padding: ${props => props.$isContactsPage ? '.4em .8em' : '.7em 1.2em'};
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: .7em;
  width: 100%;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #151313;
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }
`;

const ContactMessage = styled.p`
  font-size: 0.9em;
  margin: 0;
  white-space: nowrap;
`;


const ConnectionRequestPopup = ({ 
  onClose, 
  onSendRequest, 
  onNavigateToConnections, 
  isContactsPage, 
  isHomePage, 
  contactName,
  userId,
  PId
}) => {
  const [username, setUsername] = useState('');
  const popupRef = useRef(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const { sendConnectionRequest } = useContext(ConnectionContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSendRequest = () => {
    if (isContactsPage) {
      onSendRequest(contactName);
    } else {
      onSendRequest(username);
    }
    onClose();
  };

  const handleQRScan = async (qrData) => {
    try {
      await sendConnectionRequest(qrData.userId);
      setShowQRModal(false);
      onClose();
    } catch (error) {
      console.error('Failed to process QR connection:', error);
    }
  };

  return (
    <>
    <PopupOverlay>
      <PopupContent ref={popupRef} $isContactsPage={isContactsPage} $isHomePage={isHomePage}>
        <CloseButton $isContactsPage={isContactsPage} onClick={onClose}>&times;</CloseButton>
        <Title $isContactsPage={isContactsPage} $isHomePage={isHomePage}>
          {isHomePage ? 'Connect with Others' : 'Send Connection Request'}
        </Title>
        {isHomePage ? (
          <>
            <Button onClick={() => setShowQRModal(true)}>
              Connect with QR code
            </Button>
            <OrDivider>OR</OrDivider>
            <Button onClick={onNavigateToConnections}>Send Request from Your Connections</Button>
          </>
        ) : isContactsPage ? (
          <>
            <ContactMessage>Send request to {contactName}?</ContactMessage>
            <Button $isContactsPage={isContactsPage} onClick={handleSendRequest}>Yes</Button>
            <Button $isContactsPage={isContactsPage} onClick={onClose}>Cancel</Button>
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleSendRequest}>Send Request</Button>
            <OrDivider>OR</OrDivider>
            <Button onClick={()=> setShowQRModal(true)}>
              Connect with QR code
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </>
        )}
      </PopupContent>
    </PopupOverlay>

    <QRConnection
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        userId={userId}
        PId={PId}
      />
    </>
  );
};

export default ConnectionRequestPopup;