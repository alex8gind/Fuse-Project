import React, { useContext, useEffect } from 'react';
import { Ban } from 'lucide-react';
import { ConnectionContext } from '../../contexts/connection.context';
import {
    Card, 
    UserPhoto, 
    UserInfo, 
    PersonalId,
    UserName, 
    LastInteraction, 
    StatusContainer,
    ConnectionStatus,
    Status,
    BlockedIcon
} from "./ConnectionCard.style" 

const ConnectionCard = ({ connection, onClick }) => {
  console.log("Connection in card:", connection); 
  const { blockedUsers } = useContext(ConnectionContext);

  if (!connection) return null

  const {
    connectionId,
    userId,  
    PId,    
    name,    
    profilePicture,
    isActive,
    status,
    lastInteraction
  } = connection;


useEffect(() => {
  console.log(connection);
}, [connection]);

  return (
    <Card onClick={onClick}>
      <UserPhoto 
        src={profilePicture} 
        alt={name} 
      />
      <UserInfo>
        <UserName>{name}</UserName>
        <PersonalId>PID: {PId}</PersonalId>
        <LastInteraction>{new Date(lastInteraction).toLocaleString()}</LastInteraction>
      </UserInfo>
      <StatusContainer>
      {blockedUsers[userId] ? (
        <BlockedIcon><Ban size={20} color="red" /></BlockedIcon>
      ) : (
        <>
          <Status>{isActive ? 'Active' : 'Inactive'}</Status>
          <ConnectionStatus status={status}>
            {status === 'pending' ? 'Pending' : 'Connected'}
          </ConnectionStatus>
      </>
      )}
      </StatusContainer>
    </Card>
  );
};

export default ConnectionCard;