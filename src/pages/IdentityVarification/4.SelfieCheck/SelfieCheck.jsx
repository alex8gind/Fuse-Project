// SelfieCheck.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Camera} from 'lucide-react';
import Webcam from "react-webcam";
import { useUserContext } from '../../../contexts/user.context';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  Title,
  IconWrapper,
  Message,
  PermissionMessage,
  ActionButton,
  WebcamContainer,
  CaptureButton,
  NotificationOverlay,
  NotificationMessage,
  NotificationClose,
  FileList,
  FileItem,
  PhotoPreview,
  FileName,
  FileSize,
  RemoveButton,
  PopupOverlay,
  PopupContent,
  PopupMessage,
  PopupButtons,
  PopupButton,
  VerificationMessage,
  PhotoInfo
} from './SelfieCheck.style';

const SelfieCheck = () => {
  const navigate = useNavigate();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const webcamRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const { uploadVerificationDocument, getVerificationDocuments, deleteVerificationDocument } = useUserContext();
  const [userDocuments, setUserDocuments] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [deletedFileName, setDeletedFileName] = useState('');
  
  useEffect(() => {
    loadUserDocuments();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const documents = await getVerificationDocuments();
      setUserDocuments(documents.filter(doc => doc.documentType === 'photo') || []);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to load documents'
      });
    }
  };

  // const handleCameraAccess = () => {
  //   setIsCameraOpen(true);
  // };

  const handleCapture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setNotification({
        type: 'error',
        message: 'Failed to capture photo'
      });
      return;
    }

    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      setUploading(true);
      await uploadVerificationDocument(file, 'photo');
      await loadUserDocuments();
      
      setNotification({
        type: 'success',
        message: 'Photo captured and uploaded successfully!'
      });

    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.error || 'Failed to process captured photo'
      });
    } finally {
      setUploading(false);
      setIsCameraOpen(false);
    }
  };

  const handleDeleteClick = (docId) => {
    setDocToDelete(docId);
    setShowDeletePopup(true);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDocToDelete(null);
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    
    try {
      await deleteVerificationDocument(docToDelete);
      await loadUserDocuments();
      setDeletedFileName(userDocuments.find(doc => doc.docId === docToDelete)?.docName || '');
      setShowSuccessPopup(true);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to delete photo'
      });
    } finally {
      setShowDeletePopup(false);
      setDocToDelete(null);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
        <Title>Selfie Check</Title>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>

      {notification && (
        <NotificationOverlay>
          <NotificationMessage $type={notification.type}>
            {notification.message}
            <NotificationClose onClick={() => setNotification(null)}>
              <X size={16} />
            </NotificationClose>
          </NotificationMessage>
        </NotificationOverlay>
      )}

      {!isCameraOpen ? (
        <>
          <IconWrapper>
            <Camera size={64} />
          </IconWrapper>
          <Message>Selfie Check</Message>
          <Message $small>
            We are going to ask you to take a selfie to prove that you're a real person
          </Message>
          <PermissionMessage>
            <Camera size={16} />
            This needs camera permissions
          </PermissionMessage>
          <ActionButton onClick={() => setIsCameraOpen(true)}>
            Allow camera access
          </ActionButton>
        </>
      ) : (
        <WebcamContainer>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 720,
              height: 480,
              facingMode: "user"
            }}
          />
          <CaptureButton onClick={handleCapture} disabled={uploading}>
            <Camera size={24} />
            {uploading ? 'Processing...' : 'Take Photo'}
          </CaptureButton>
          <ActionButton onClick={() => setIsCameraOpen(false)}>
            <X size={24} />
            Cancel
          </ActionButton>
        </WebcamContainer>
      )}

      <FileList>
        {userDocuments.map((doc) => (
          <FileItem key={doc.docId}>
            <PhotoPreview src={doc.url} alt="Selfie preview" />
            <PhotoInfo>
              <FileName>{doc.docName}</FileName>
              <FileSize>{new Date(doc.createdAt).toLocaleDateString()}</FileSize>
            </PhotoInfo>
            <RemoveButton onClick={() => handleDeleteClick(doc.docId)}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>

      {userDocuments.length > 0 && (
        <ActionButton onClick={() => navigate('/id-verification', { 
          state: { 
            step1Completed: true,
            step2Completed: true 
          } 
        })}>
          Proceed
        </ActionButton>
      )}

      {showDeletePopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupMessage>Are you sure you want to delete this photo?</PopupMessage>
            <PopupButtons>
              <PopupButton onClick={cancelDelete}>Cancel</PopupButton>
              <PopupButton $delete onClick={confirmDelete}>Delete</PopupButton>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}

      {showSuccessPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupMessage>
              {`File "${deletedFileName}" was successfully deleted`}
            </PopupMessage>
            <PopupButtons>
              <PopupButton onClick={() => setShowSuccessPopup(false)}>OK</PopupButton>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default SelfieCheck;