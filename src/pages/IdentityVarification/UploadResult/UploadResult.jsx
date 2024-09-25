import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, CheckCircle, XCircle } from 'lucide-react';
import {
  Container,
  Header,
  CloseButton,
  IconWrapper,
  Title,
  Message,
  ActionButton,
  RetryLink,
  ErrorDetails
} from './UploadResult.style';

const UploadResult = () => {
  const navigate = useNavigate();
  const { documentType, result } = useParams();
  const location = useLocation();
  const { fileUrl, error } = location.state || {};

  const isSuccess = result === 'success';

  const getTitle = () => {
    return `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} Upload ${isSuccess ? 'Successful' : 'Failed'}`;
  };

  const getMessage = () => {
    return isSuccess
      ? `Your ${documentType} has been successfully uploaded and verified.`
      : `There was an issue with your ${documentType} upload. Please try again.`;
  };

  const handleAction = () => {
    // console.warn("DEBUG: handleAction");
    if (isSuccess) {
      navigate('/profile');
    } else {
      navigate(`/${documentType}-capture-instructions`);
    }
  };

  return (
    <Container>
      <Header>
        <CloseButton onClick={() => navigate('/')}>
          <X />
        </CloseButton>
      </Header>
      <IconWrapper>
        {isSuccess ? <CheckCircle size={64} color="#4CAF50" /> : <XCircle size={64} color="#F44336" />}
      </IconWrapper>
      <Title>{getTitle()}</Title>
      <Message $isSuccess={isSuccess}>{getMessage()}</Message>
      {isSuccess && fileUrl && (
        <Message>File URL: {fileUrl}</Message>
      )}
      {!isSuccess && error && (
        <ErrorDetails>Error details: {error}</ErrorDetails>
      )}
      <ActionButton $isSuccess={isSuccess} onClick={handleAction}>
        {isSuccess ? 'Continue' : 'Try Again'}
      </ActionButton>
      
      {!isSuccess && (
        <RetryLink to={`/${documentType}-capture-instructions`}>
          Return to Capture Instructions
        </RetryLink>
      )}
    </Container>
  );
};

export default UploadResult;