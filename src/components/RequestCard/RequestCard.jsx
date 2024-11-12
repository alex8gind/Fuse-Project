import React, { useState } from 'react';
import { Check, X, Loader } from 'lucide-react';
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
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);
    const { acceptConnectionRequest, declineConnectionRequest } = useConnectionContext();
  
    const handleAccept = async () => {
      try {
        setActionLoading(true);
        setActionError(null);
  
        // Check if the request exists and is pending
        if (!request || request.status !== 'pending') {
          throw new Error('Invalid request state');
        }
  
        await acceptConnectionRequest(request.connectionId);
      } catch (error) {
        console.error('Error accepting connection:', error);
        setActionError(error.message || 'Failed to accept connection request');
      } finally {
        setActionLoading(false);
      }
    };

    const handleDecline = async () => {
        try {
          setActionLoading(true);
          setActionError(null);
    
          if (!request || request.status !== 'pending') {
            throw new Error('Invalid request state');
          }
    
          await declineConnectionRequest(request.connectionId);
        } catch (error) {
          console.error('Error declining connection:', error);
          setActionError(error.message || 'Failed to decline connection request');
        } finally {
          setActionLoading(false);
        }
      };
  
    // Only render if we have a valid request
    if (!request || !request.connectionId) {
      return null;
    }
  
    return (
      <RequestCardContainer>
        <UserPhoto 
          src={request.profilePicture} 
          alt={request.name}
        />
        <UserInfo>
          <UserName>{request.name}</UserName>
          <PersonalId>PID: {request.PId}</PersonalId>
          <RequestStatus>
            Status: {request.status === 'pending' ? 'Pending Approval' : request.status}
          </RequestStatus>
          {actionError && (
            <MessageContainer>{actionError}</MessageContainer>
          )}
        </UserInfo>
        {request.status === 'pending' && (
          <ActionButtons>
            <AcceptButton 
              onClick={handleAccept}
              disabled={actionLoading}
              title="Accept connection request"
            >
              {actionLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <>
                  <Check size={20} />
                  Accept
                </>
              )}
            </AcceptButton>
            <DeclineButton
            onClick={handleDecline}
            disabled={actionLoading}
            title="Decline connection request"
          >
            {actionLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <>
                <X size={20} />
                Decline
              </>
            )}
            </DeclineButton>
          </ActionButtons>
        )}
      </RequestCardContainer>
    );
  };

export default RequestCard;