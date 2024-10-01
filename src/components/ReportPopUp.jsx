import React from 'react';
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
`;

const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const PopUp = ({ onClose, onReportAndBlock }) => {
  return (
    <Overlay onClick={onClose}>
      <PopUpContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Report and Block User</h2>
        <CommentField placeholder="Enter your reason for reporting..." />
        <ActionButton onClick={onReportAndBlock}>Report and Block</ActionButton>
      </PopUpContainer>
    </Overlay>
  );
};

export default PopUp;