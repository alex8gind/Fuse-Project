import React from 'react';
import {
    Card, 
    UserPhoto, 
    UserInfo, 
    UserName, 
    LastInteraction, 
    Status
} from "./ConnectionCard.style" 



const ConnectionCard = ({ photo, name, lastInteraction, status, onClick }) => {
  return (
    <Card onClick={onClick}>
      <UserPhoto src={photo} alt={name} />
      <UserInfo>
        <UserName>{name}</UserName>
        <LastInteraction>{lastInteraction}</LastInteraction>
      </UserInfo>
      <Status>{status}</Status>
    </Card>
  );
};

export default ConnectionCard;