import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackBtn from "../../components/BackBtn";
import {PageContainer, Header, UserPhoto, UserInfo, UserName, UserStatus, InteractionsList, InteractionItem} from "./Contacts.style"

const Connection = () => {
    const { id } = useParams();
    const [connectionData, setConnectionData] = useState(null);
  
    useEffect(() => {
      // In a real application, you would fetch the connection data here
      // For now, we'll use mock data
      const mockData = {
        id: id,
        name: 'Alexander Khan',
        photo: 'https://example.com/photo1.jpg',
        status: 'Online',
        interactions: [
          { id: 1, type: 'message', content: 'Hello!', timestamp: '2023-09-15T14:30:00Z' },
          { id: 2, type: 'call', content: 'Voice call, duration: 5 minutes', timestamp: '2023-09-14T10:00:00Z' },
          { id: 3, type: 'message', content: 'Are we meeting tomorrow?', timestamp: '2023-09-13T18:45:00Z' },
        ]
      };
      setConnectionData(mockData);
    }, [id]);
  
    if (!connectionData) return <div>Loading...</div>;
  
    return (
      <PageContainer>
        <BackBtn/>
        <Header>
          <UserPhoto src={connectionData.photo} alt={connectionData.name} />
          <UserInfo>
            <UserName>{connectionData.name}</UserName>
            <UserStatus>{connectionData.status}</UserStatus>
          </UserInfo>
        </Header>
        <InteractionsList>
          {connectionData.interactions.map(interaction => (
            <InteractionItem key={interaction.id}>
              <p>{interaction.content}</p>
              <small>{new Date(interaction.timestamp).toLocaleString()}</small>
            </InteractionItem>
          ))}
        </InteractionsList>
      </PageContainer>
    );
  };
  
  export default Connection;