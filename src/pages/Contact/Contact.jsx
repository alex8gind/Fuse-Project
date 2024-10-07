import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackBtn from "../../components/BackBtn";
import PopUp from "../../components/ReportPopUp";
import SendRequestBtn from "../../components/SendRequestBtn";
import { ConnectionContext } from '../../contexts/connection.context';
import { UserContext } from '../../contexts/user.context';
import {
  PageContainer, 
  Header, 
  UserPhoto, 
  UserInfo, 
  UserName, 
  UserStatus, 
  ReportBtn, 
  BlockedBadge, 
  InteractionsList, 
  InteractionItem,
  ActionButtonsContainer,
  ActionButton
} from "./Contact.style"

const Contact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { 
      connections, 
      blockUser, 
      blockedUsers, 
      unblockUser, 
      getUserConnections,
      reportUser,
      loading: contextLoading,
      error: contextError,
      sendConnectionRequest,
      cancelSentRequest,
      checkRequest,
      sentRequests
    } = useContext(ConnectionContext);
    const [connectionData, setConnectionData] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState(null);
    const isRequestSent = useMemo(() => checkRequest(id), [checkRequest, id, sentRequests]);

    useEffect(() => {
      console.log("DEBUGGING: loading:", loading, contextLoading);  
    }, [loading, contextLoading])

    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const connection = connections.find(conn => String(conn.userId) === String(id));
        if (connection) {
          setConnectionData({
            ...connection,
            interactions: [
              { id: 1, type: 'message', content: 'Hello!', timestamp: '2023-09-15T14:30:00Z' },
              { id: 2, type: 'call', content: 'Voice call, duration: 5 minutes', timestamp: '2023-09-14T10:00:00Z' },
              { id: 3, type: 'message', content: 'Are we meeting tomorrow?', timestamp: '2023-09-13T18:45:00Z' },
            ]
          });
        } else {
          setError('Connection not found');
        }
      } catch (err) {
        console.error('Error fetching connection data:', err);
        setError('Failed to fetch connection data');
      } finally {
        setLoading(false);
      }
    }, [id, connections, getUserConnections, checkRequest]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const handleBlockToggle = async () => {
      setLoading(true);
      try {
        const isBlocked = blockedUsers[id];
        if (isBlocked) {
          await unblockUser(id);
        } else {
          await blockUser(id);
        }
        await fetchData();
      } catch (err) {
        setError('Failed to block/unblock user');
      } finally {
        setLoading(false);
      }
    };

    const handleReportAndBlock = async (reason) => {
      setReportLoading(true);
      setReportError(null);
      try {
        await reportUser(id, reason);
        await blockUser(id);
        setShowPopUp(false);
        await fetchData();
        return true;
      } catch (err) {
        console.error('Failed to report and block user:', err);
        setReportError('Failed to report and block user. Please try again.');
        return false;
      } finally {
        setReportLoading(false);
      }
    };

    const handleSendRequest = async () => {
      try {
        await sendConnectionRequest(id);
        console.log(`Request sent to ${connectionData.name}`);
      } catch (error) {
        console.error('Failed to send connection request:', error);
        setError('Failed to send connection request');
      }
    };

    const handleCancelRequest = async () => {
      try {
        await cancelSentRequest(id);
        console.log(`Request cancelled for ${connectionData.name}`);
      } catch (error) {
        console.error('Failed to cancel connection request:', error);
        setError('Failed to cancel connection request');
      }
    };
  
    if (loading || contextLoading) return <PageContainer>Loading...</PageContainer>;
    if (error || contextError) return <PageContainer>Error: {error || contextError}</PageContainer>;
    if (!connectionData) return <PageContainer>No connection data available</PageContainer>;

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
            onClick={isRequestSent ? handleCancelRequest : handleSendRequest}
            isRequestSent={isRequestSent}
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
            
        <ActionButtonsContainer>
          {!isBlocked && (
            <ReportBtn onClick={() => setShowPopUp(true)}>Report</ReportBtn>
          )}
          <ActionButton onClick={handleBlockToggle} disabled={loading}>
            {loading ? 'Processing...' : (isBlocked ? 'Unblock User' : 'Block User')}
          </ActionButton>
        </ActionButtonsContainer>

        {showPopUp && (
          <PopUp 
            onClose={() => setShowPopUp(false)}
            onReportAndBlock={handleReportAndBlock}
            loading={reportLoading}
            error={reportError}
          />
        )}
      </PageContainer>
    );
};

export default Contact;