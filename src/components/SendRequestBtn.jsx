import styled from 'styled-components';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectionRequestPopup from './ConnectionRequestPopup';
import { X } from 'lucide-react';
import { ConnectionContext } from '../contexts/connection.context';

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  padding: 0.5em 1em;
  width: fit-content;
  background-color: ${props => props.$requestSent ? props.theme.colors.background : props.theme.colors.primaryOrange};
  color: ${props => props.$requestSent ? props.theme.colors.primaryOrange : props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primaryOrange};
  outline: ${props => props.$requestSent ? 'none' : `2px solid ${props.theme.colors.primaryOrange}`};
  border-radius: 1.1vh;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.main};
  cursor: ${props => props.$requestSent ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$requestSent ? 0.7 : 1};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.3rem;
    padding: .7em 1.3em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.5rem;
    padding: .9em 1.4em;
  }
`;

const WarningCloud = styled.div`
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
  background-color: ${props => props.theme.colors.navigation_bg};
  border: 1px solid ${props => props.theme.colors.primaryOrange};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primaryOrange};
  white-space: nowrap;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent ${props => props.theme.colors.primaryOrange} transparent transparent;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendRequestBtn = ({ isHomePage, isContactsPage, contactName, onClick, selectedUser, userId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const buttonRef = useRef(null);
  const { sendConnectionRequest, isRequestSent } = useContext(ConnectionContext);
  const [requestSent, setRequestSent] = useState(userId ? isRequestSent(userId) : false);
  const navigate = useNavigate();


  useEffect(() => {
    if (userId) {
      setRequestSent(isRequestSent(userId));
    }
  }, [userId, isRequestSent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowWarning(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (requestSent) {
      return; // Do nothing if request is already sent
    }
    if (isHomePage) {
      setShowPopup(true);
    } else if (selectedUser || isContactsPage) {
      setShowPopup(true);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleSendRequest = async () => {
    if (userId) {
      try {
        await sendConnectionRequest(userId);
        setRequestSent(true);
        if (onClick) {
          onClick();
        }
        setShowPopup(false);
      } catch (error) {
        console.error('Failed to send connection request:', error);
      }
    }
  };

  const handleNavigateToConnections = () => {
    navigate('/connections');
  };
  
  return (
    <ButtonContainer ref={buttonRef}>
      <StyledButton onClick={handleClick} $requestSent={requestSent}>
      {requestSent ? 'Request Sent' : 'Send Connection Request'}
      </StyledButton>
      {showWarning && (
        <WarningCloud>
          Please choose a contact first.
          <CloseButton onClick={() => setShowWarning(false)}>
            <X size={16} />
          </CloseButton>
        </WarningCloud>
      )}
      {showPopup && (
        <ConnectionRequestPopup
          onClose={() => setShowPopup(false)}
          onSendRequest={handleSendRequest}
          onNavigateToConnections={handleNavigateToConnections}
          isContactsPage={isContactsPage}
          isHomePage={isHomePage}
          contactName={contactName || (selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : '')}
        />
      )}
    </ButtonContainer>
  );
};

export default SendRequestBtn;