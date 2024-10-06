import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user.context";
import { maxios } from "../utils/maxios";

export const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getUserConnections();
      getPendingRequests();
      getSentRequests();
    }
  }, [user]);


  const getUserConnections = async () => {
    try {
      setLoading(true);
      // In a real scenario, this would be an API call to fetch user's connections
      const response = await maxios.get('success', { connections: [] });
      setConnections(response.data.connections);
    } catch (err) {
      setError('Failed to fetch connections');
    } finally {
      setLoading(false);
    }
  };

  const getPendingRequests = async () => {
    try {
      const response = await maxios.get('success', { pendingRequests: [] });
      setPendingRequests(response.data.pendingRequests);
    } catch (err) {
      setError('Failed to fetch pending requests');
    }
  };

  const getSentRequests = async () => {
    try {
      const response = await maxios.get('success', { sentRequests: [] });
      setSentRequests(response.data.sentRequests);
    } catch (err) {
      setError('Failed to fetch sent requests');
    }
  };

  const searchUsers = async (searchTerm) => {
    try {
      // In a real scenario, this would be an API call to search users
      const response = await maxios.get('success', { 
        users: [] // Simulating an empty result for now
      });
      return response.data.users;
    } catch (err) {
      setError('Failed to search users');
      throw err;
    }
  };

  
  const sendConnectionRequest = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'Connection request sent successfully' });
      setSentRequests(prev => [...prev, { userId, status: 'pending' }]);
      return response.data;
    } catch (err) {
      setError('Failed to send connection request');
      throw err;
    }
  };

  const cancelSentRequest = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'Connection request cancelled successfully' });
      setSentRequests(prev => prev.filter(request => request.userId !== userId));
      return response.data;
    } catch (err) {
      setError('Failed to cancel connection request');
      throw err;
    }
  };

  const acceptRequest = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'Connection request accepted successfully' });
      setPendingRequests(prev => prev.filter(request => request.userId !== userId));
      setConnections(prev => [...prev, { userId, status: 'connected' }]);
      return response.data;
    } catch (err) {
      setError('Failed to accept connection request');
      throw err;
    }
  };

  const declineRequest = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'Connection request declined successfully' });
      setPendingRequests(prev => prev.filter(request => request.userId !== userId));
      return response.data;
    } catch (err) {
      setError('Failed to decline connection request');
      throw err;
    }
  };


  const blockUser = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'User blocked successfully' });
      setConnections(prev => prev.filter(conn => conn.userId !== userId));
      return response.data;
    } catch (err) {
      setError('Failed to block user');
      throw err;
    }
  };

  const unblockUser = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'User unblocked successfully' });
      // Note: In a real scenario, you might want to fetch the user's data again
      // or update the connection status accordingly
      return response.data;
    } catch (err) {
      setError('Failed to unblock user');
      throw err;
    }
  };

  const reportUser = async (userId, reason) => {
    try {
      const response = await maxios.post('success', { message: 'User reported successfully' });
      await blockUser(userId);
      return response.data;
    } catch (err) {
      setError('Failed to report user');
      throw err;
    }
  };

  const isRequestSent = (userId) => {
    return sentRequests.some(request => request.userId === userId);
  };


  return (
    <ConnectionContext.Provider value={{ 
      connections,
      setConnections,
      pendingRequests,
      sentRequests,
      blockedUsers,
      setBlockedUsers,
      loading,
      error,
      getUserConnections,
      getPendingRequests,
      getSentRequests,
      sendConnectionRequest,
      cancelSentRequest,
      acceptRequest,
      declineRequest,
      blockUser,
      unblockUser,
      reportUser,
      searchUsers,
      isRequestSent
       }}>
      {children}
    </ConnectionContext.Provider>
  );
};