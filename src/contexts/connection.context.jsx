import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "./user.context";
import api from "../services/api";

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
      // getBlockedUsers();
    }
  }, [user]);

  useEffect(() => {
    console.log("🫥🫥🫥", sentRequests);
  }, [sentRequests]);

  const sendConnectionRequest = async (receiverId) => {
    try {
      setLoading(true);
      const response = await api.post('/connection', { receiverId });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const newConnection = response.data.data;

    const transformedConnection = {
      connectionId: newConnection.connectionId,
      userId: newConnection.otherUser.userId,
      PId: newConnection.otherUser.PId,
      name: `${newConnection.otherUser.firstName} ${newConnection.otherUser.lastName}`,
      profilePicture: newConnection.otherUser.profilePicture,
      isActive: newConnection.otherUser.isActive,
      status: newConnection.status,
      lastInteraction: newConnection.updatedAt
    };

    setSentRequests(prev => [...prev, transformedConnection]);

    // Refresh all connection lists to ensure consistency
    await getUserConnections();

    return transformedConnection

    } catch (err) {
      console.error('Error sending connection request:', err);
      setError(err.message || 'Failed to send connection request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelConnectionRequest = async (connectionId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/connection/${connectionId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const cancelledConnection = response.data.data;

      const transformedConnection = {
        connectionId: cancelledConnection.connectionId,
        userId: cancelledConnection.otherUser.userId,
        PId: cancelledConnection.otherUser.PId,
        name: `${cancelledConnection.otherUser.firstName} ${cancelledConnection.otherUser.lastName}`,
        profilePicture: cancelledConnection.otherUser.profilePicture,
        isActive: cancelledConnection.otherUser.isActive,
        status: cancelledConnection.status,
        lastInteraction: cancelledConnection.updatedAt
      };

       // Remove from sent requests
      setSentRequests(prev => 
        prev.filter(req => req.connectionId !== connectionId)
      );

       // Remove from connections if it exists there
       setConnections(prev => 
        prev.filter(conn => conn.connectionId !== connectionId)
      );

      await getUserConnections();

      return transformedConnection

    } catch (err) {
      console.error('Error canceling connection request:', err);
      setError(err.message || 'Failed to cancel connection request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const getUserConnections = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     const response = await api.get('/connections');

  //     if (!response.data) {
  //       throw new Error('No data received from server');
  //     }
  
  //     if (!response.data?.success || !Array.isArray(response.data?.data)) {
  //       throw new Error(response.data.message || 'Failed to fetch connections');
  //     }
  
  //     if (!Array.isArray(response.data.data)) {
  //       throw new Error('Invalid data format received from server');
  //     }
  //     console.log('😶‍🌫️😶‍🌫️😶‍🌫️', response.data);

  //     // Transform the response data to match your frontend structure
  //     const transformedConnections = response.data.data.map(conn => ({
  //       connectionId: conn.connectionId,
  //       userId: conn.otherUser.userId,
  //       PId: conn.otherUser.PId,
  //       firstName: conn.otherUser.firstName,  
  //       lastName: conn.otherUser.lastName, 
  //       profilePicture: conn.otherUser.profilePicture,
  //       status: conn.status,
  //       isActive: conn.otherUser.isActive, 
  //       lastInteraction: conn.updatedAt
  //     }));

  //     setConnections(transformedConnections);
  //     return transformedConnections;
  //   } catch (err) {
  //     console.error('Error fetching connections:', err);
  //     setError(err.response?.data?.message || err.message || 'Failed to fetch connections');
  //     return []; 
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getUserConnections = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/connections');
      console.log("Raw response data:", response.data);

      if (!response.data?.success || !Array.isArray(response.data?.data)) {
        throw new Error('Invalid response format from server');
      }

      const connectionData = response.data.data;
      
      // Split connections based on status
      const activeConnections = [];
      const pending = [];
      const sent = [];

      connectionData.forEach(connection => {
        if (!connection.otherUser) return; 

      
      const transformedConnection = {
        connectionId: connection.connectionId,
        userId: connection.otherUser.userId,
        PId: connection.otherUser.PId,
        name: `${connection.otherUser.firstName} ${connection.otherUser.lastName}`,
        profilePicture: connection.otherUser.profilePicture,
        isActive: connection.otherUser.isActive,
        status: connection.status,
        lastInteraction: connection.updatedAt,
        senderId: connection.senderId
      };

      console.log("Processing connection:", connection); 
      console.log("Status:", connection.status); 
      console.log("SenderId:", connection.senderId, "UserId:", user.userId); 
        
      if (connection.status === 'accepted') {
        activeConnections.push(transformedConnection);
      } else if (connection.status === 'pending') {
        if (connection.senderId === user.userId) {
          sent.push(transformedConnection);
        } else {
          pending.push(transformedConnection);
        }
      }
    });


      console.log("Active connections:", activeConnections); // Debug log
      console.log("Pending requests:", pending); // Debug log
      console.log("Sent requests:", sent); // Debug log

      setConnections(activeConnections);  // Now this will contain the sent requests
      setPendingRequests(pending);
      setSentRequests(sent);
      
      return activeConnections;

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch connections';
      setError(errorMessage);
      console.error('Error fetching connections:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getConnection = async (connectionId) => {
    try {
      setLoading(true);
      const response = await api.get(`/connection/${connectionId}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const connection = response.data.data;
      return {
        connectionId: connection.connectionId,
        userId: connection.otherUser.userId,
        PId: connection.otherUser.PId,
        name: `${connection.otherUser.firstName} ${connection.otherUser.lastName}`,
        profilePicture: connection.otherUser.profilePicture,
        isActive: connection.otherUser.isActive,
        status: connection.status,
        lastInteraction: connection.updatedAt,
        senderId: connection.senderId
      };
    } catch (err) {
      console.error('Error fetching connection:', err);
      setError(err.message || 'Failed to fetch connection');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptConnectionRequest = async (connectionId) => {
    try {
      setLoading(true);
      const response = await api.patch(`/connection/${connectionId}/accept`);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const updatedConnection = response.data.data;

      // Remove from pending requests
      setPendingRequests(prev => 
        prev.filter(req => req.connectionId !== connectionId)
      );

      // Update connections list
      await getUserConnections();

      return updatedConnection;
    } catch (err) {
      console.error('Error accepting connection request:', err);
      setError(err.message || 'Failed to accept connection request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const declineConnectionRequest = async (connectionId) => {
  try {
    setLoading(true);
    const response = await api.patch(`/connection/${connectionId}/decline`);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Remove from pending requests
    setPendingRequests(prev => 
      prev.filter(req => req.connectionId !== connectionId)
    );

    // Also remove from connections if it exists there
    setConnections(prev => 
      prev.filter(conn => conn.connectionId !== connectionId)
    );

  } catch (err) {
    console.error('Error declining connection request:', err);
    setError(err.message || 'Failed to decline connection request');
    throw err;
  } finally {
    setLoading(false);
  }
  };

  const searchUserByPId = async (pid) => {
  try {
      setLoading(true);
      
      const response = await api.get(`/search/pid/${pid}`);

      if (!response.data.success) {
          throw new Error(response.data.message);
      }

      const foundUser = response.data.data;

      // Return empty array if no user found or if it's the current user
      if (!foundUser || foundUser.userId === user.userId) 

      // Check if user is  blocked
      if (blockedUsers[foundUser.userId]) {
        return [];
      }

      // Check if there's an existing connection
      const existingConnection = connections.find(conn => 
        conn.userId === foundUser.userId
      );
      if (existingConnection) {
        // If connection exists, return it but with updated timestamp
        return [{
            ...existingConnection,
            updatedAt: new Date().toISOString(), // Update timestamp
            otherUser: {
                ...existingConnection.otherUser,
                isActive: foundUser.isActive // Update active status
            }
        }];
      }

      // If no existing connection, return array with single result in otherUser format
      return [{
          connectionId: null,
          otherUser: {
              userId: foundUser.userId,
              PId: foundUser.PId,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              profilePicture: foundUser.profilePicture,
              isActive: foundUser.isActive
          },
          status: 'none',
          updatedAt: new Date().toISOString()
      }];

  } catch (err) {
      if (err.response?.status === 404) {
          return []; // Return empty array if user not found
      }
      console.error('Error searching user by PID:', err);
      setError(err.message || 'Failed to search user');
      return [];
  } finally {
      setLoading(false);
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

  const getReportedUsers = async () => {
    try {
      const response = await maxios.get('success', { reportedUsers: [] });
      setReportedUsers(response.data.reportedUsers);
    } catch (err) {
      setError('Failed to fetch reported users');
    }
  };

  const checkRequest = useCallback((userId) => {
    return sentRequests.some(request => 
      request.otherUser && request.otherUser.userId === userId
    );
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

      getConnection,
      getUserConnections,
      sendConnectionRequest,
      cancelConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      searchUserByPId,
      blockUser,
      unblockUser,
      getBlockedUsers, 
      reportUser,
      getReportedUsers,
      checkRequest
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};