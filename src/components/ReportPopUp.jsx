import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopUpContainer = styled.div`
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CommentField = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${props => props.$error ? props.theme.colors.error : props.theme.colors.border};
`;

const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const WarningText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  margin-top: 10px;
`;

const PopUp = ({ onClose, onReportAndBlock, loading, error }) => {
  const [reason, setReason] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleReportAndBlock = async () => {
    if (!reason.trim()) {
      setValidationError('Please provide a reason for reporting.');
      return;
    }
    setValidationError('');
    const success = await onReportAndBlock(reason);
    if (success) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopUpContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Report User</h2>
        <WarningText>Warning: Reporting this user will automatically block them.</WarningText>
        <CommentField 
          placeholder="Enter your reason for reporting..." 
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (validationError) setValidationError('');
          }}
          disabled={loading}
          $error={!!validationError}
        />
        {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
        <ActionButton 
          onClick={handleReportAndBlock} 
          disabled={loading || !reason.trim()}
        >
          {loading ? 'Processing...' : 'Report User'}
        </ActionButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PopUpContainer>
    </Overlay>
  );
};

export default PopUp;