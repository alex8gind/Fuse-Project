import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Check, File } from 'lucide-react';

const PopupOverlay = styled.div`
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

const PopupContent = styled.div`
  background-color: ${props => props.theme.colors.navigation_bg};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
`;

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  gap: 1rem;
`;

const DocumentCheckbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentName = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const DocumentDate = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.icons};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  ${props => props.$primary ? `
    background-color: ${props.theme.colors.primaryOrange};
    color: ${props.theme.colors.navigation_bg};
    
    &:hover {
      opacity: 0.9;
    }
  ` : `
    background-color: ${props.theme.colors.background};
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.icons}20;
    }
  `}
`;

const NoDocumentsMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.icons};
  font-size: 0.9rem;
  margin: 2rem 0;
`;

const ShareDocumentsPopup = ({ documents, onClose, onShare, recipientName }) => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleToggleDocument = (docId) => {
    setSelectedDocuments(prev => 
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleShare = () => {
    onShare(selectedDocuments);
  };

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        
        <Title>Share Medical Documents with {recipientName}</Title>

        {documents.length > 0 ? (
          <DocumentsList>
            {documents.map(doc => (
              <DocumentItem key={doc.docId}>
                <DocumentCheckbox
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.docId)}
                  onChange={() => handleToggleDocument(doc.docId)}
                />
                <File size={20} color="#666" />
                <DocumentInfo>
                  <DocumentName>{doc.docName}</DocumentName>
                  <DocumentDate>{new Date(doc.createdAt).toLocaleDateString()}</DocumentDate>
                </DocumentInfo>
              </DocumentItem>
            ))}
          </DocumentsList>
        ) : (
          <NoDocumentsMessage>
            No medical documents available to share
          </NoDocumentsMessage>
        )}

        <ButtonsContainer>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            $primary
            onClick={handleShare}
            disabled={selectedDocuments.length === 0}
          >
            <Check size={18} />
            Share Selected
          </Button>
        </ButtonsContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default ShareDocumentsPopup;