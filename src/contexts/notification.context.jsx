import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { initializeSocket, disconnectSocket } from '../services/socketClient';
import { UserContext } from './user.context';

// Create the context with a default value that matches the shape of your context
const NotificationContext = createContext({
  notifications: [],
  unreadCount: 0,
  isConnected: false,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {}
});

// Custom hook for using the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Main provider component as default export
const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useContext(UserContext);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const createNotification = useCallback((type, payload) => {
    const notification = {
      id: Date.now(),
      type,
      data: payload.data,
      connectionId: payload.connectionId,
      documents: payload.documents,
      read: false,
      createdAt: new Date(payload.createdAt),
      responded: type === 'connection_request' ? false : undefined
    };

    setNotifications(prev => [notification, ...prev]);
  }, []);

  // Socket event handlers
  const notificationHandlers = useCallback(() => ({
    connection_request: (payload) => {
      console.log('Received connection request:', payload);
      createNotification('connection_request', payload);
    },
    connection_accepted: (payload) => {
      console.log('Connection request accepted:', payload);
      createNotification('connection_accepted', payload);
    },
    connection_declined: (payload) => {
      console.log('Connection request declined:', payload);
      createNotification('connection_declined', payload);
    },
    document_shared: (payload) => {
      console.log('Document shared:', payload);
      createNotification('document_shared', payload);
    }
  }), [createNotification]);

  // Socket connection management
  useEffect(() => {
    let mounted = true;

    const connectSocket = async () => {
      if (!user) return;

      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const newSocket = await initializeSocket(token);
      if (!newSocket || !mounted) return;

      setSocket(newSocket);
      setIsConnected(newSocket.connected);

      // Set up event handlers
      const handlers = notificationHandlers();
      Object.entries(handlers).forEach(([event, handler]) => {
        newSocket.on(event, handler);
      });

      newSocket.on('connect', () => mounted && setIsConnected(true));
      newSocket.on('disconnect', () => mounted && setIsConnected(false));
    };

    connectSocket();

    return () => {
      mounted = false;
      if (socket) {
        const handlers = notificationHandlers();
        Object.keys(handlers).forEach(event => {
          socket.off(event);
        });
        disconnectSocket();
      }
    };
  }, [user, notificationHandlers]);

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={
      {
        notifications,
        unreadCount,
        isConnected,
        markAsRead,
        markAllAsRead,
        clearAll
      }
    }>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;