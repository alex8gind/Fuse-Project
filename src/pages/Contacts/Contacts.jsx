import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackBtn from "../../components/BackBtn";
import PopUp from "../../components/ReportPopUp";
import SendRequestBtn from "../../components/SendRequestBtn";
import { ConnectionContext } from '../../contexts/connection.context';
import {PageContainer, 
  Header, 
  UserPhoto, 
  UserInfo, 
  UserName, 
  UserStatus, 
  ReportBtn, 
  BlockedBadge, 
  InteractionsList, 
  InteractionItem} from "./Contacts.style"

const Connection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { connections, blockUser, blockedUsers } = useContext(ConnectionContext);
    const [connectionData, setConnectionData] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
      const fetchConnectionData = () => {
        console.log("Fetching connection data for id:", id);
        console.log("Available connections:", connections);

        // Find the connection in the connections array, converting both to strings for comparison
        const connection = connections.find(conn => String(conn.userId) === String(id));
        
        if (connection) {
          console.log("Found connection:", connection);
          // If found, set the connection data
          setConnectionData({
            ...connection,
            interactions: [
              { id: 1, type: 'message', content: 'Hello!', timestamp: '2023-09-15T14:30:00Z' },
              { id: 2, type: 'call', content: 'Voice call, duration: 5 minutes', timestamp: '2023-09-14T10:00:00Z' },
              { id: 3, type: 'message', content: 'Are we meeting tomorrow?', timestamp: '2023-09-13T18:45:00Z' },
            ]
          });
        } else {
          // If not found, you might want to show an error or redirect
          console.error('Connection not found for id:', id);
          navigate('/connections'); // Redirect to connections list
        }
      };

      fetchConnectionData();
    }, [id, connections, navigate]);

    const handleReportAndBlock = () => {
      blockUser(id);
      setShowPopUp(false);
    };

    const handleSendRequest = () => {
      // This function can be used to handle any additional logic after sending a request
      console.log(`Request sent to ${connectionData.name}`);
    };
  
    if (!connectionData) return <div>Loading...</div>;
    
    const isBlocked = blockedUsers[id];

    return (
      <PageContainer>
        <BackBtn/>
        <Header>
          <UserPhoto src={connectionData.profilePicture} alt={connectionData.name} />
          <UserInfo>
            <UserName>
              {connectionData.name}
              {isBlocked && <BlockedBadge>Blocked</BlockedBadge>}
            </UserName>           
            <UserStatus>{connectionData.isActive ? 'Online' : 'Offline'}</UserStatus>          
          </UserInfo>
         
        </Header>
        {!isBlocked && (
          <SendRequestBtn 
            isContactsPage={true} 
            contactName={connectionData.name}
            userId={connectionData.userId}
            onClick={handleSendRequest}
          />
        )}
        
        <InteractionsList>
          {connectionData.interactions.map(interaction => (
            <InteractionItem key={interaction.id}>
              <p>{interaction.content}</p>
              <small>{new Date(interaction.timestamp).toLocaleString()}</small>
            </InteractionItem>
          ))}
        </InteractionsList>
            
        {!isBlocked && (
        <ReportBtn onClick={() => setShowPopUp(true)}>Report</ReportBtn>
      )}

      {showPopUp && (
        <PopUp 
          onClose={() => setShowPopUp(false)}
          userId={id}
        />
      )}

      </PageContainer>
    );
  };
  
  export default Connection;