import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import BackBtn from "../../components/BackBtn";
import PopUp from "../../components/ReportPopUp";
import SendRequestBtn from "../../components/SendRequestBtn";
import { ConnectionContext } from '../../contexts/connection.context';
import {
  PageContainer, 
  Header, 
  UserPhoto, 
  UserInfo, 
  UserName, 
  UserStatus, 
  ReportBtn, 
  BlockedBadge, 
  RequestMessage,
  ActionButtonsContainer,
  ActionButton
} from "./Contact.style"

const Contact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  const { 
    getConnection, 
    getUserConnections,
    sendConnectionRequest, 
    cancelConnectionRequest,
    sentRequests,
    pendingRequests,
    blockUser, 
    unblockUser, 
    blockedUsers, 
    reportUser,
    loading: contextLoading,
    error: contextError,
    checkRequest
    } = useContext(ConnectionContext);

    const [connectionData, setConnectionData] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState(null);
    const [message, setMessage] = useState('');

    const isRequestSent = useMemo(() => {
      if (!connectionData?.userId) return false;
      return sentRequests.some(request => request.userId === connectionData.userId);
    }, [sentRequests, connectionData]);

    const isPendingRequest = useMemo(() => {
      if (!connectionData?.userId) return false;
      return pendingRequests.some(request => request.userId === connectionData.userId);
    }, [pendingRequests, connectionData]);

    useEffect(() => {
      console.log("🤷‍♂️🤷‍♂️🤷‍♂️", connectionData);  
    }, [connectionData])

   
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const connection = await getConnection(id);
      if (connection) {
        setConnectionData(connection);
      } else {
        setError('Connection not found');
      }
    } catch (err) {
      console.error('Error fetching connection data:', err);
      setError('Failed to fetch connection data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

    const handleBlockToggle = async () => {
      if (!connectionData?.userId) return;

      setLoading(true);
      try {
        const isBlocked = blockedUsers[connectionData.userId];
        if (isBlocked) {
          await unblockUser(connectionData.userId);
        } else {
          await blockUser(connectionData.userId);
        }
        await fetchData();
      } catch (err) {
        setError('Failed to block/unblock user');
      } finally {
        setLoading(false);
      }
    };

    const handleReportAndBlock = async (reason) => {
      if (!connectionData?.userId) return false;

      setReportLoading(true);
      setReportError(null);
      try {
        await reportUser(connectionData.userId, reason);
        await blockUser(connectionData.userId);
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
      if (!connectionData?.userId) return;
  
        try {
          await sendConnectionRequest(connectionData.userId);
          setShowConfirmPopup(false);
          setShowSuccessPopup(true);
          setMessage('Connection request sent successfully');
          await fetchData(); 
        } catch (error) {
          setMessage('Failed to send connection request');
        }
    };
  
    const handleCancelRequest = async () => {
      if (!connectionData?.connectionId) return;

      try {
        await cancelConnectionRequest(connectionData.connectionId);
        setMessage('Connection request cancelled');
        await fetchData(); 
      } catch (error) {
        setMessage('Failed to cancel connection request');
      }
    };
  
  
    if (loading || contextLoading) return <PageContainer>Loading...</PageContainer>;
    if (error || contextError) return <PageContainer>Error: {error || contextError}</PageContainer>;
    if (!connectionData) return <PageContainer>No connection data available</PageContainer>;
  

    const isBlocked = blockedUsers[connectionData?.userId]
 
    return (
      <PageContainer>
        <BackBtn/>
        <Header>
          <UserPhoto 
          src={connectionData.profilePicture} 
          alt={connectionData.name} 
          />
          <UserInfo>
            <UserName>
              {connectionData.name}
              {isBlocked && <BlockedBadge>Blocked</BlockedBadge>}
            </UserName>           
            <UserStatus>
              {connectionData.isActive ? 'Active' : 'Inactive'}
            </UserStatus>          
          </UserInfo>
        </Header>
        
        {!isBlocked && (
          <SendRequestBtn 
            isContactsPage={true} 
            contactName={connectionData.name}
            connectionId={connectionData.connectionId}
            userId={connectionData.userId}
            onClick={isRequestSent ? handleCancelRequest : handleSendRequest}
            isRequestSent={isRequestSent}
          />
        )}
        
        {/* <InteractionsList>
          {connectionData.interactions.map(interaction => (
            <InteractionItem key={interaction.id}>
              <p>{interaction.content}</p>
              <small>{new Date(interaction.timestamp).toLocaleString()}</small>
            </InteractionItem>
          ))}
        </InteractionsList> */}
            
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

      {message && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: message.includes('error') ? 'red' : 'green' }}>
          {message}
        </div>
      )}
      </PageContainer>
    );
};

export default Contact;