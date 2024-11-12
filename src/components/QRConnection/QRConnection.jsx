import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner'; // Fixed import name
import { AlertCircle, QrCode, Check, X, Loader } from 'lucide-react';
import {
  Modal,
  ModalContent,
  CloseButton,
  Title,
  QRContainer,
  QRImage,
  ActionButton,
  ErrorMessage,
  ScannerContainer,
  LoadingContainer
} from './QRConnection.style';

const ConnectionQRModal = ({ isOpen, onClose, mode = 'generate', userId, PId, onScan }) => {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (mode === 'generate') {
      const generateQR = async () => {
        try {
          const QRCode = await import('qrcode');
          const connectionData = {
            type: 'connection-request',
            userId,
            PId,
            timestamp: Date.now()
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

      generateQR();
    }
  }, [mode, userId, PId]);

  const handleCopy = async () => {
    const connectionData = {
      type: 'connection-request',
      userId,
      PId,
      timestamp: Date.now()
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(connectionData));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleScan = async (data) => {
    setScanning(true);
    try {
      const connectionData = JSON.parse(data);
      if (connectionData.type !== 'connection-request' || !connectionData.userId) {
        throw new Error('Invalid QR code format');
      }
      await onScan(connectionData);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to access camera');
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (scanning) {
      return (
        <LoadingContainer>
          <Loader size={32} />
          <span>Processing QR code...</span>
        </LoadingContainer>
      );
    }

    if (mode === 'generate') {
      return (
        <QRContainer>
          {qrUrl && <QRImage src={qrUrl} alt="Connection QR Code" />}
          <ActionButton onClick={handleCopy}>
            {copied ? <Check size={20} /> : <QrCode size={20} />}
            {copied ? 'Copied!' : 'Copy Connection Data'}
          </ActionButton>
        </QRContainer>
      );
    }

    return (
      <ScannerContainer>
        <Scanner
          onResult={handleScan}
          onError={handleError}
          constraints={{
            facingMode: 'environment'
          }}
          containerStyle={{
            width: '100%',
            height: '100%',
            padding: 0,
            border: 'none'
          }}
          videoStyle={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </ScannerContainer>
    );
  };

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <Title>
          {mode === 'generate' ? 'Share Connection QR' : 'Scan Connection QR'}
        </Title>

        {error && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}

        {renderContent()}
      </ModalContent>
    </Modal>
  );
};

export default ConnectionQRModal;