// RequestCard.jsx
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useConnectionContext } from '../../contexts/connection.context';
import {
  RequestCardContainer,
  UserPhoto,
  UserInfo,
  UserName,
  PersonalId,
  RequestStatus,
  ActionButtons,
  AcceptButton,
  DeclineButton,
  MessageContainer
} from './RequestCard.style';

const RequestCard = ({ request }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { acceptConnectionRequest, declineConnectionRequest } = useConnectionContext();

  const handleAction = async (action) => {
    setLoading(true);
    setError(null);
    try {
      if (action === 'accept') {
        await acceptConnectionRequest(request.connectionId);
      } else {
        await declineConnectionRequest(request.connectionId);
      }
    } catch (err) {
      setError(err.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequestCardContainer>
      <UserPhoto 
        src={request.profilePicture || '/default-avatar.png'}
        alt={request.name}
      />
      <UserInfo>
        <UserName>{request.name}</UserName>
        <PersonalId>PID: {request.PId}</PersonalId>
        <RequestStatus>Status: Pending</RequestStatus>
      </UserInfo>
      <ActionButtons>
        <AcceptButton 
          onClick={() => handleAction('accept')}
          disabled={loading}
        >
          <Check size={20} />
          Accept
        </AcceptButton>
        <DeclineButton
          onClick={() => handleAction('decline')}
          disabled={loading}
        >
          <X size={20} />
          Decline
        </DeclineButton>
      </ActionButtons>
      {error && <MessageContainer>{error}</MessageContainer>}
    </RequestCardContainer>
  );
};

export default RequestCard;