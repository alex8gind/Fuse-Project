import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, X, Smartphone, Aperture, HandMetal, Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import Webcam from "react-webcam";
import { useUserContext } from '../../../contexts/user.context';
import {
  Container,
  Header,
  ButtonsContainer,
  BackButton,
  Title,
  IconWrapper,
  DropZone,
  UploadIcon,
  DropText,
  ActionButton,
  FileList,
  FileItem,
  FileName,
  FileSize,
  RemoveButton,
  LoadingBar,
  LoadingText,
  WebcamContainer,
  CaptureButton,
  InstructionsList,
  InstructionItem,
  InstructionIcon,
  InstructionText,
  NotificationOverlay,
  NotificationMessage,
  NotificationClose,
  PopupOverlay,
  PopupContent,
  PopupMessage,
  PopupButtons,
  PopupButton,
  OrDivider
} from './CaptureInstructions.style';

const CaptureInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { documentType, idType } = location.state || { documentType: 'document', idType: 'unknown' };
  const [uploading, setUploading] = useState(false);
  const [userDocuments, setUserDocuments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [deletedFileName, setDeletedFileName] = useState('');
  const [files, setFiles] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const { uploadVerificationDocument, getVerificationDocuments, deleteVerificationDocument} = useUserContext();
  
  // Load documents on mount
  useEffect(() => {
    loadUserDocuments();
  }, []);

  useEffect(() => {
   console.log("LOCATION:STATE:", location.state);
  }, [location]);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadUserDocuments = async () => {
    try {
        const documents = await getVerificationDocuments();
        setUserDocuments(documents || []);
    } catch (error) {
        setNotification({
            type: 'error',
            message: 'Failed to load documents'
        });
    }
};

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
    e.target.value = '';
  }, []);

  const addFiles = useCallback((newFiles) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      newFiles.forEach(file => {
        if (!updatedFiles.some(f => f.name === file.name && f.size === file.size)) {
          updatedFiles.push(file);
        }
      });
      return updatedFiles;
    });
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    for (const file of files) {
        try {
            const uploadPromise = uploadVerificationDocument(file, documentType);
            
            // Handle upload progress
            if (uploadPromise.onUploadProgress) {
                uploadPromise.onUploadProgress((progress) => {
                    setUploadProgress(progress);
                });
            }
            
            await uploadPromise;
            setNotification({
                type: 'success',
                message: `Successfully uploaded ${file.name}`
            });
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.response?.data?.error || `Failed to upload ${file.name}`
            });
        }
    }
    setUploading(false);
    setFiles([]);
    setUploadProgress(0);
    await loadUserDocuments();
}, [files, documentType, uploadVerificationDocument]);

  // Auto upload when files are added
  useEffect(() => {
    if (files.length > 0) {
      handleUpload();
    }
  }, [files, handleUpload]);

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
        const docToBeDeleted = userDocuments.find(doc => doc.docId === docToDelete);
        await deleteVerificationDocument(docToDelete);
        await loadUserDocuments();
        setDeletedFileName(docToBeDeleted?.docName || '');
        setShowSuccessPopup(true);
    } catch (error) {
        setNotification({
            type: 'error',
            message: error.response?.data?.error || 'Failed to delete document'
        });
    } finally {
        setShowDeletePopup(false);
        setDocToDelete(null);
    }
};

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    setDeletedFileName('');
  };

  const toggleCamera = () => {
    setIsCameraOpen(prev => !prev);
  };


  const handleCapture = useCallback(async () => {
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
        const file = new File([blob], `${documentType}_${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        setUploading(true);
        await uploadVerificationDocument(file, documentType);
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
}, [documentType, uploadVerificationDocument]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
      </Header>

      {notification && (
        <NotificationOverlay>
          <NotificationMessage $type={notification.type}>
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
            <NotificationClose onClick={() => setNotification(null)}>
              <X size={16} />
            </NotificationClose>
          </NotificationMessage>
        </NotificationOverlay>
      )}

    <Title>Capture Instructions</Title>
      <IconWrapper>
        <Smartphone size={64} />
      </IconWrapper>

      {!isCameraOpen ? (
        <>
          <DropZone
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <UploadIcon>
              <Upload size={48} />
            </UploadIcon>
            <DropText>Drag and drop your files here</DropText>
            <ActionButton onClick={handleBrowse} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Browse Files'}
            </ActionButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
            />
          </DropZone>

          <OrDivider>or</OrDivider>

          <ButtonsContainer>
            <ActionButton onClick={toggleCamera}>
              <Camera size={24} />
              Take a Photo
            </ActionButton>
          </ButtonsContainer>
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
              facingMode: "environment" // This will use the back camera on mobile devices
            }}
          />
          <ButtonsContainer>
            <CaptureButton onClick={handleCapture} disabled={uploading}>
              <Camera size={24} />
              {uploading ? 'Processing...' : 'Capture Photo'}
            </CaptureButton>
            <ActionButton onClick={toggleCamera}>
              <X size={24} />
              Cancel
            </ActionButton>
          </ButtonsContainer>
        </WebcamContainer>
      )}

      <FileList>
        {userDocuments.map((doc) => (
          <FileItem key={doc.docId}>
            <div>
              <FileName>{doc.docName}</FileName>
              <FileSize>{new Date(doc.createdAt).toLocaleDateString()}</FileSize>
            </div>
            <RemoveButton onClick={() => handleDeleteClick(doc.docId)}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>

      {uploading && (
        <>
          <LoadingBar $progress={uploadProgress} />
          <LoadingText>Uploading... {uploadProgress}%</LoadingText>
        </>
      )}

      {showDeletePopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupMessage>Are you sure you want to delete this document?</PopupMessage>
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
            <PopupMessage>File "{deletedFileName}" was successfully deleted</PopupMessage>
            <PopupButtons>
              <PopupButton onClick={handleSuccessClose}>OK</PopupButton>
            </PopupButtons>
          </PopupContent>
        </PopupOverlay>
      )}

      <InstructionsList>
        <InstructionItem>
          <InstructionIcon><Smartphone size={24} /></InstructionIcon>
          <InstructionText>
            Please position your {idType} so that it fits the frame of your screen.
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InstructionIcon><Aperture size={24} /></InstructionIcon>
          <InstructionText>
            {documentType === 'document' ? 'Place it on a flat surface' : 'Ensure good lighting'}
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InstructionIcon><HandMetal size={24} /></InstructionIcon>
          <InstructionText>
            Avoid glare, shaking, and blur
          </InstructionText>
        </InstructionItem>
      </InstructionsList>

      {userDocuments.length > 0 && (
      <ButtonsContainer>
        <ActionButton onClick={() => navigate('/id-verification', { state: { step1Completed: true } })}>
          Proceed
        </ActionButton>
      </ButtonsContainer>
)}

    </Container>
  );
};

export default CaptureInstructions;