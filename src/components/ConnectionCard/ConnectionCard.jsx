import React from 'react';
import { Ban } from 'lucide-react';
import {
    Card, 
    UserPhoto, 
    UserInfo, 
    UserName, 
    LastInteraction, 
    Status,
    BlockedIcon
} from "./ConnectionCard.style" 



const ConnectionCard = ({ photo, name, lastInteraction, status, isBlocked, onClick }) => {
  return (
    <Card onClick={onClick}>
      <UserPhoto src={photo} alt={name} />
      <UserInfo>
        <UserName>{name}</UserName>
        <LastInteraction>{lastInteraction}</LastInteraction>
      </UserInfo>
      {isBlocked ? (
        <BlockedIcon><Ban size={20} color="red" /></BlockedIcon>
      ) : (
      <Status>{status}</Status>
      )}
    </Card>
  );
};

export default ConnectionCard;