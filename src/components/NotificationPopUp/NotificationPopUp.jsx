import React, { useRef, useContext} from 'react';
import { Bell, Check, X, Calendar, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { NotificationContext} from '../../contexts/notification.context.jsx';
import { ConnectionContext } from '../../contexts/connection.context';
import {
  Container,
  Header,
  Title,
  NotificationList,
  NotificationItem,
  NotificationContent,
  NotificationTime,
  UserAvatar,
  EmptyMessage,
  CloseButton,
  ReadAllButton,
  UserInfo,
  UserName,
  ActionButtons,
  AcceptButton,
  DeclineButton,
  IconWrapper,
  LoadingSpinner,
  NotificationMessage,
  UnreadIndicator,
  StatusIcon,
  StatusMessage
} from './NotificationPopUp.style.jsx';
import { use } from 'framer-motion/client';

const NotificationsPopup = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    clearAll, 
    deleteAllNotifications,
    unreadCount,
    markAllAsRead
  } = useContext(NotificationContext); 

const { 
    acceptConnectionRequest, 
    declineConnectionRequest 
} = useContext(ConnectionContext);

const popupRef = useRef(null);

if (!isOpen) return null;

const formatTime = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInHours = (now - notificationDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return notificationDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return notificationDate.toLocaleDateString();
};

const handleAcceptRequest = async (notification) => {
    try {
      // Get connectionId from notification data
      const connectionId = notification.connectionId;
      await acceptConnectionRequest(connectionId);
      markAsRead(notification.id);
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
};

const handleDeclineRequest = async (notification) => {
    try {
      const connectionId = notification.connectionId;
      await declineConnectionRequest(connectionId);
      markAsRead(notification.id);
    } catch (error) {
      console.error('Failed to decline request:', error);
    }
};

const renderNotificationContent = (notification) => {
    switch (notification.type) {
        case 'sentRequest':
    return (
      <>
        <IconWrapper>
          <UserPlus size={20} />
        </IconWrapper>
        <NotificationContent>
          <UserInfo>
            <UserAvatar 
              src={notification.senderId.profilePicture} 
              alt={notification.senderId.firstName} 
            />
            <div>
              <UserName>{notification.senderId.firstName}</UserName>
              <NotificationMessage>
                sent you a connection request
              </NotificationMessage>
            </div>
          </UserInfo>
          {!notification.responded && (
            <ActionButtons>
              <AcceptButton 
                onClick={() => handleAcceptRequest(notification)}
                disabled={notification.loading}
              >
                {notification.loading ? <LoadingSpinner /> : 'Accept'}
              </AcceptButton>
              <DeclineButton 
                onClick={() => handleDeclineRequest(notification)}
                disabled={notification.loading}
              >
                Decline
              </DeclineButton>
            </ActionButtons>
          )}
        </NotificationContent>
      </>
    );

    case 'acceptedRequest':
        return (
          <>
            <StatusIcon type="acceptedRequest">
              {notification.status === 'unread' && <CheckCircle size={20} />}
            </StatusIcon>
            <NotificationContent>
              <UserInfo>
                <UserAvatar 
                  src={notification.senderId.profilePicture} 
                  alt={notification.senderId.firstName} 
                />
                <div>
                  <UserName>{notification.senderId.firstName}</UserName>
                  <StatusMessage type="acceptedRequest">
                    accepted your connection request
                  </StatusMessage>
                </div>
              </UserInfo>
            </NotificationContent>
          </>
        );

        case 'sharedDocument':
        return (
          <>
            <IconWrapper>
              <Calendar size={20} />
            </IconWrapper>
            <NotificationContent>
              <UserInfo>
                <UserAvatar 
                  src={notification.senderId.senderPicture} 
                  alt={notification.senderId.firstName} 
                />
                <div>
                  <UserName>{notification.senderId.firstName}</UserName>
                  <NotificationMessage>
                    shared a document with you.
                  </NotificationMessage>
                </div>
              </UserInfo>
            </NotificationContent>
          </>
        );

      default:
        return (
          <NotificationMessage>
            {notification.message}
          </NotificationMessage>
        );
    }
};

return (
<Container ref={popupRef}>
<Header>
  <Title>
    Notifications {unreadCount > 0 && `(${unreadCount})`}
  </Title>
  <div>
    {notifications.length > 0 && (
      <>
        {unreadCount > 0 && (
          <ReadAllButton onClick={markAllAsRead}> {/* Using new markAllAsRead */}
            Mark all as read
          </ReadAllButton>
        )}
        <ReadAllButton onClick={clearAll}>
          Clear all
        </ReadAllButton>
      </>
    )}
    <CloseButton onClick={onClose}>
      <X size={20} />
    </CloseButton>
  </div>
</Header>

<NotificationList>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <NotificationItem 
        key={notification.id} 
        $unread={!notification.read}
        onClick={() => !notification.read && markAsRead(notification.id)}
      >
        {!notification.read && <UnreadIndicator />}
        {renderNotificationContent(notification)}
        <NotificationTime>
          {formatTime(notification.createdAt)}
        </NotificationTime>
      </NotificationItem>
    ))
  ) : (
    <EmptyMessage>
      <Bell size={40} />
      <p>No notifications yet</p>
    </EmptyMessage>
  )}
</NotificationList>
</Container>
);
};

export default NotificationsPopup;
