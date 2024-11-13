import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './user.context';
import api from '../services/api';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("🔔🔔🔔", notifications);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      
      if (response.data.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.notifications.filter(n => n.status === 'unread').length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const { data: response } = await api.put(`/notifications/${notificationId}/read`);
      
      if (response.success) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId ? { ...notif, status: 'read' } : notif
          )
        );
        setUnreadCount(prev => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await api.put('/notifications');
      
      if (response.data.success) {
        setNotifications(prev => prev.map(notif => ({ ...notif, status: 'read' })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const { data: response } = await api.delete(`/notifications/${notificationId}`);
      
      if (response.success) {
        setNotifications(prev => {
          const updatedNotifications = prev.filter(notif => notif.id !== notificationId);
          setUnreadCount(updatedNotifications.filter(n => n.status === 'unread').length);
          return updatedNotifications;
        });
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const { data: response } = await api.delete('/notifications');
      
      if (response.success) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  // Fetch notifications when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      // Clear notifications when user logs out
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      fetchNotifications,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      deleteAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;