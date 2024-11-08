import React from 'react';
import {
  StatusContainer,
  StatusTitle,
  StatusSubtitle,
  StatusList,
  StatusItem,
  StatusDot,
  StatusText
} from './VerificationStatus.style';

const VerificationStatus = ({ documents }) => {
  const acceptedDocuments = [
    { type: 'passport', label: 'Passport' },
    { type: 'id', label: 'ID Card' },
    { type: 'driving_license', label: 'Driver\'s License' }
  ];

  const hasVerificationDocument = documents.some(doc => 
    acceptedDocuments.some(accepted => accepted.type === doc.documentType)
  );

  const selectedDocument = documents.find(doc => 
    acceptedDocuments.some(accepted => accepted.type === doc.documentType)
  );

  return (
    <StatusContainer>
      <StatusTitle>Identity Verification</StatusTitle>
      <StatusSubtitle>
        Please upload one of the following documents:
      </StatusSubtitle>
      <StatusList>
        {acceptedDocuments.map(({ type, label }) => {
          const isSelected = selectedDocument?.documentType === type;
          return (
            <StatusItem 
              key={type} 
              isComplete={hasVerificationDocument}
              isSelected={isSelected}
            >
              <StatusDot isSelected={isSelected} />
              <StatusText>{label}</StatusText>
            </StatusItem>
          );
        })}
      </StatusList>
    </StatusContainer>
  );
};

export default VerificationStatus;