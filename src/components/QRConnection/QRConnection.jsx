import React, { useState, useEffect, useContext, useRef } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { AlertCircle, QrCode, Check, X, Loader } from 'lucide-react';
import { ConnectionContext } from '../../contexts/connection.context';
import {
  PopupOverlay,
  ModalContent,
  CloseButton,
  Title,
  QRContainer,
  QRImage,
  ActionButton,
  ErrorMessage,
  ScannerContainer,
  LoadingContainer,
  TabContainer,
  TabButton,
  ConfirmationOverlay,
  ConfirmationContent,
  ConfirmationMessage,
  ConfirmationButtons,
  UserPreview,
  UserAvatar,
  UserInfo,
  UserName,
  UserPId
} from './QRConnection.style';

const QRConnection = ({ 
  onClose, 
  userId, 
  PId }) => {
  const [qrUrl, setQrUrl] = useState('');
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [activeMode, setActiveMode] = useState('generate');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scannedUserData, setScannedUserData] = useState(null);
  const { searchUserByPId, sendConnectionRequest } = useContext(ConnectionContext)
  const popupRef = useRef(null);

  useEffect(() => {
    if (activeMode === 'generate') {
      generateQR();
    }
  }, [activeMode, userId, PId]);


  const generateQR = async () => {
    try {
      const QRCode = await import('qrcode');
      const connectionData = {
        type: 'fuse-connection-request',
        userId,
        PId
      };

      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, JSON.stringify(connectionData), {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        }
      });
      
      setQrUrl(canvas.toDataURL());
    } catch (err) {
      console.error('QR generation failed:', err);
      setError('Failed to generate QR code');
    }
  };

  const handleScan = async (data, fulldata) => {
    console.log("📸📸📸", data, fulldata);
    if (!data) return

    setScanning(true);
    setError(null);

    try {
      console.log('Raw scanned data:', data);
      const parsedData = JSON.parse(data);
      console.log('Scanned QR Code Data:', parsedData); 

      if (parsedData.type !== 'fuse-connection-request') {
        throw new Error('Invalid QR code format - not a Fuse connection request');
      }

      if (!parsedData.userId || !parsedData.PId) {
        throw new Error('Invalid QR code - missing required data');
      }

      if (parsedData.userId === userId) {
        throw new Error('Cannot connect with yourself');
      }

      // Search for user using PId
      console.log('Searching for user with PId:', parsedData.PId);
      const searchResult = await searchUserByPId(parsedData.PId);
      console.log('Search result:', searchResult);
      
      if (!searchResult || searchResult.length === 0) {
        throw new Error('User not found');
      }

      const userData = searchResult[0];

       // Verify the found user matches the QR code data
       if (userData.userId !== parsedData.userId) {
        throw new Error('Invalid user data in QR code');
      }

      setScannedUserData(userData);
      setShowConfirmation(true);
      setScanning(false);

    } catch (err) {
      console.error('Scan error:', err);
      setError(err.message || 'Failed to process QR code');
      setScanning(false);
    }
  };

  const handleConfirmConnection = async () => {
        try {

          if (!scannedUserData) {
            throw new Error('No user data available');
          }

          await sendConnectionRequest(scannedUserData.userId);
       
          // You might want to show a success message here
          onClose()
        } catch (error) {
          console.error('Failed to send connection request:', error);
          setError(error.message || 'Failed to send connection request. Please try again.');
        }
  };

  const handleModeChange = (newMode) => {
    setError(null);
    setShowConfirmation(false);
    setScannedUserData(null);
    setActiveMode(newMode);
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
  <>
  <PopupOverlay onClick={handleOverlayClick}>
      <ModalContent 
      onClick={(e) => e.stopPropagation()}
      ref={popupRef} 
      >

      <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <TabContainer>
          <TabButton 
            onClick={() => handleModeChange('generate')} 
            $active={activeMode === 'generate'}
          >
            Show QR Code
          </TabButton>
          <TabButton 
            onClick={() => handleModeChange('scan')} 
            $active={activeMode === 'scan'}
          >
            Scan QR Code
          </TabButton>
        </TabContainer>

        <Title>
          {activeMode === 'generate' ? 'Your Connection QR Code' : 'Scan Connection QR Code'}
        </Title>

        {error && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}

        {scanning ? (
          <LoadingContainer>
            <Loader size={32} />
            <span>Processing QR code...</span>
          </LoadingContainer>
        ) : activeMode === 'generate' ? (
          <QRContainer>
            {qrUrl && <QRImage src={qrUrl} alt="Connection QR Code" />}
          </QRContainer>
        ) : (
          <ScannerContainer>
            <Scanner
              onScan={(result) => {
                if (result?.text) {
                  handleScan(result.text);
                }
              }}
              onError={(err) => {
                console.error('Scanner error:', err);
                setError('Failed to access camera.  Please ensure camera permissions are granted.');
              }}
              constraints={{
                facingMode: 'environment'
              }}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
            <p>Point your camera at a Fuse QR code</p>
          </ScannerContainer>
        )}

        {showConfirmation && scannedUserData && (
          <ConfirmationOverlay>
            <ConfirmationContent>
              <UserPreview>
                <UserAvatar $photoUrl={scannedUserData.profilePicture} />
                <UserInfo>
                  <UserName>{scannedUserData.firstName} {scannedUserData.lastName}</UserName>
                  <UserPId>PID: {scannedUserData.PId}</UserPId>
                </UserInfo>
              </UserPreview>
              <ConfirmationMessage>
                <UserCheck size={24} />
                Send connection request?
              </ConfirmationMessage>
              <ConfirmationButtons>
                <ActionButton onClick={() => setShowConfirmation(false)} $secondary>
                  Cancel
                </ActionButton>
                <ActionButton onClick={handleConfirmConnection}>
                  Confirm
                </ActionButton>
              </ConfirmationButtons>
            </ConfirmationContent>
          </ConfirmationOverlay>
        )}
      </ModalContent>

  </PopupOverlay>
  </>
  );
};

export default QRConnection;