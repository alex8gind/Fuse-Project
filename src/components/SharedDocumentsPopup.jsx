import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, FileText, Eye } from 'lucide-react';
import api from '../services/api'; 
import DocumentViewer from './DocumentViewer';
import { useConnectionContext } from '../contexts/connection.context'; 

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
  width: 96%;
  max-width: 1200px;
  height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;

   // Add space for the close button without overlapping content
   & > button:first-child {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
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

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  gap: 1rem;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentName = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const DocumentDate = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.icons};
`;

const DocumentStatus = styled.span`
  font-size: 0.8rem;
  color: ${props => props.$status === 'accepted' ? props.theme.colors.primaryOrange : 
    props.$status === 'pending' ? props.theme.colors.icons : props.theme.colors.error};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primaryOrange};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoDocumentsMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.icons};
  font-size: 0.9rem;
  padding: 2rem;
`;

const SharedDocumentsPopup = ({ onClose, connectionId, userName }) => {
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewerDocument, setViewerDocument] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const { getSharedDocuments } = useConnectionContext(); 

  const fetchSharedDocuments = async () => {
    try {
      setLoading(true);
      // const documents = await getSharedDocuments(connectionId);
      const response = await api.get(`/connection/${connectionId}/shared-documents`);
    
      console.log('Shared documents response:', response.data.data); 
      
      if (response.data.data) {
        setSharedDocuments(response.data.data);
      }
      // setSharedDocuments(documents);
    } catch (error) {
      console.error('Error fetching shared documents:', error);
      setError(error.message || 'Failed to fetch shared documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchSharedDocuments();
  }, []);


  const handleViewDocument = async (document) => {
    try {
      console.log('Opening document:', document);
      const isPDF = document.fileType.toLowerCase() === 'pdf';
      const isImage = ['jpg', 'jpeg', 'png'].includes(document.fileType.toLowerCase());
  
      if (!isPDF && !isImage) {
        throw new Error('Unsupported file type');
      }
  
      setViewerDocument(document);
      setShowViewer(true);
    } catch (error) {
      console.error('Error viewing document:', error);
      setError('Failed to view document: ' + error.message);
    }
  };
  

  const handleCloseViewer = () => {
    setViewerDocument(null);
    setShowViewer(false);
  };

  if (loading) {
    return (
      <PopupOverlay>
        <PopupContent>
          <Title>Loading shared documents...</Title>
        </PopupContent>
      </PopupOverlay>
    );
  }

  return (
    <>
        <PopupOverlay onClick={onClose}>
            <PopupContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                <X size={20} />
                </CloseButton>
        
                <Title>Documents Shared with {userName}</Title>

                {error && (
                <NoDocumentsMessage>
                    Error: {error}
                </NoDocumentsMessage>
                )}

                {!error && sharedDocuments.length === 0 && (
                <NoDocumentsMessage>
                    No documents have been shared in this connection
                </NoDocumentsMessage>
                )}

                {!error && sharedDocuments.length > 0 && (
                <DocumentsList>
                    {sharedDocuments.map(doc => (
                    <DocumentItem key={doc.docId}>
                        <FileText size={24} color="#666" />
                        <DocumentInfo>
                        <DocumentName>{doc.docName}</DocumentName>
                        <DocumentDate>
                            Shared on: {new Date(doc.sharedWith[0].sharedAt).toLocaleDateString()}
                        </DocumentDate>
                        <DocumentStatus $status={doc.sharedWith[0].status}>
                            Status: {doc.sharedWith[0].status}
                        </DocumentStatus>
                        </DocumentInfo>
                        <ActionButton
                        onClick={() => handleViewDocument(doc)}
                        title={`View ${doc.docName}`}
                        >
                        <Eye size={20} />
                        </ActionButton>
                    </DocumentItem>
                    ))}
                </DocumentsList>
                )}
            </PopupContent>
        </PopupOverlay>

    {showViewer && viewerDocument && (
        <PopupOverlay>
            <PopupContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={handleCloseViewer}>
                    <X size={20} />
                </CloseButton>
                {viewerDocument.fileType.toLowerCase() === 'pdf' ? (
                    <DocumentViewer 
                        docId={viewerDocument.docId} // Make sure this matches your document structure
                        fileName={viewerDocument.docName}
                        connectionId={connectionId}
                    />
                ) : (
          <ImageViewer 
            docId={viewerDocument.docId}
            fileName={viewerDocument.docName}
            connectionId={connectionId}
          />
        )}
            </PopupContent>
        </PopupOverlay>
)}
    </>
);    
};

export default SharedDocumentsPopup;