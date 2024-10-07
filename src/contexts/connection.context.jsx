import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "./user.context";
import { maxios } from "../utils/maxios";

export const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([{userId: "2", status: 'pending'}]);
  const [blockedUsers, setBlockedUsers] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getUserConnections();
      getPendingRequests();
      getSentRequests();
      getBlockedUsers();
    }
  }, [user]);


  const getUserConnections = async () => {
    try {
      setLoading(true);
      // In a real scenario, this would be an API call to fetch user's connections
      const response = await maxios.get('success', { connections: [
        {
          userId: "2",
          PId: 'A2B2', 
          firstName: 'Jane',
          lastName: 'Smith',
          DateOfBirth: '1988-09-22',
          gender: 'female',
          phoneOrEmail: '+1234567890',
          password: 'hashedPassword456',
          isVerified: true,
          isBlocked: false,
          isAdmin: true,
          isActive: true,
          profilePicture: 'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          lastLogin: '2023-09-20T09:45:00Z',
          documents: [104, 105],
          createdAt: '2023-02-15T14:30:00Z',
          updatedAt: '2023-03-01T11:45:00Z'
        },
      ] });
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
      setBlockedUsers(prev => ({ ...prev, [userId]: true }));
      // Don't remove from connections list, just update the blocked status
      setConnections(prev => prev.map(conn => 
        conn.userId === userId ? { ...conn, isBlocked: true } : conn
      ));
      return response.data;
    } catch (err) {
      setError('Failed to block user');
      throw err;
    }
  };

  const unblockUser = async (userId) => {
    try {
      const response = await maxios.post('success', { message: 'User unblocked successfully' });
      setBlockedUsers(prev => {
        const newBlockedUsers = { ...prev };
        delete newBlockedUsers[userId];
        return newBlockedUsers;
      });
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

  const getBlockedUsers = async () => {
    try {
      const response = await maxios.get('success', { blockedUsers: {} });
      setBlockedUsers(response.data.blockedUsers);
    } catch (err) {
      setError('Failed to fetch blocked users');
    }
  };

  const checkRequest = useCallback((userId) => {
    return sentRequests.some(request => request.userId === userId);
  }, [sentRequests]);


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
      checkRequest
       }}>
      {children}
    </ConnectionContext.Provider>
  );
};