import React, { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, X, Smartphone, Aperture, HandMetal, Upload, Camera } from 'lucide-react';
import Webcam from "react-webcam";
import api from '../../../services/api';
import { toast } from 'react-toastify';
import {
  Container,
  Header,
  BackButton,
  CloseButton,
  Title,
  IconWrapper,
  InstructionsList,
  InstructionItem,
  InstructionIcon,
  InstructionText,
  ActionButton,
  OrDivider,
  ButtonsContainer,
  LoadingBar,
  LoadingText,
  HiddenFileInput,
  WebcamContainer,
  CaptureButton
} from './CaptureInstructions.style';

const CaptureInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { documentType, idType } = location.state || { documentType: 'document', idType: 'Passport' };
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    console.warn("DEBUG: uploadFile");
    try {
      const response = await api.post('/users/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      console.log('Upload successful:', response.data);

      setIsUploading(false);
      toast.success('File uploaded successfully!');
      navigate(`/upload-result/${documentType}/success`, { state: { fileUrl: response.data.fileUrl } });
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      toast.error(`Upload failed: ${error.response?.data?.error || error.message}`);
      debugger
      console.log("DEBUG:navigating to upload-result/failure");
      navigate(`/upload-result/${documentType}/failure`, { state: { error: error.response?.data?.error || error.message } });
    }
  };

  const handleTakePhoto = useCallback(() => {
    setIsCameraOpen(true);
  }, []);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Convert base64 to blob
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
          uploadFile(file);
        })
        .catch(error => {
          console.error('Error capturing photo:', error);
          toast.error(`Failed to capture photo: ${error.message}`);
        });
    } else {
      toast.error('Failed to capture photo. Please try again.');
    }
    setIsCameraOpen(false);
  }, [uploadFile]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}><ChevronLeft /></BackButton>
        <CloseButton onClick={() => navigate('/')}><X /></CloseButton>
      </Header>
      <Title>Capture Instructions</Title>
      <IconWrapper>
        <Smartphone size={64} color="#6366f1" />
      </IconWrapper>
      {!isCameraOpen ? (
        <ButtonsContainer>
          <ActionButton onClick={handleUploadClick} disabled={isUploading}>
            <Upload size={24} />
            Upload File
          </ActionButton>
          <HiddenFileInput 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,application/pdf"
          />
          <OrDivider>or</OrDivider>
          <ActionButton onClick={handleTakePhoto} disabled={isUploading}>
            <Camera size={24} />
            Take Photo
          </ActionButton>
        </ButtonsContainer>
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
          <CaptureButton onClick={handleCapture}>
            <Camera size={24} />
            Capture
          </CaptureButton>
        </WebcamContainer>
      )}
      {isUploading && (
        <>
          <LoadingBar $progress={uploadProgress} />
          <LoadingText>Uploading... {uploadProgress}%</LoadingText>
        </>
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
    </Container>
  );
};

export default CaptureInstructions;