import React, { useRef, useContext} from 'react';
import { Bell, Check, X, Calendar, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { useNotification } from '../../contexts/notification.context.jsx';
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

const NotificationsPopup = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    clearAll, 
    unreadCount,
    markAllAsRead
  } = useNotification(); 

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
        case 'connection_request':
    return (
      <>
        <IconWrapper>
          <UserPlus size={20} />
        </IconWrapper>
        <NotificationContent>
          <UserInfo>
            <UserAvatar 
              src={notification.data.profilePicture} 
              alt={notification.data.name} 
            />
            <div>
              <UserName>{notification.data.name}</UserName>
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

    case 'connection_accepted':
        return (
          <>
            <StatusIcon type="connection_accepted">
              <CheckCircle size={20} />
            </StatusIcon>
            <NotificationContent>
              <UserInfo>
                <UserAvatar 
                  src={notification.data.profilePicture} 
                  alt={notification.data.name} 
                />
                <div>
                  <UserName>{notification.data.name}</UserName>
                  <StatusMessage type="connection_accepted">
                    accepted your connection request
                  </StatusMessage>
                </div>
              </UserInfo>
            </NotificationContent>
          </>
        );

      case 'connection_declined':
        return (
          <>
            <StatusIcon type="connection_declined">
              <XCircle size={20} />
            </StatusIcon>
            <NotificationContent>
              <UserInfo>
                <UserAvatar 
                  src={notification.data.profilePicture} 
                  alt={notification.data.name} 
                />
                <div>
                  <UserName>{notification.data.name}</UserName>
                  <StatusMessage type="connection_declined">
                    declined your connection request
                  </StatusMessage>
                </div>
              </UserInfo>
            </NotificationContent>
          </>
        );
      
        case 'document_shared':
        return (
          <>
            <IconWrapper>
              <Calendar size={20} />
            </IconWrapper>
            <NotificationContent>
              <UserInfo>
                <UserAvatar 
                  src={notification.data.senderPicture} 
                  alt={notification.data.senderName} 
                />
                <div>
                  <UserName>{notification.data.senderName}</UserName>
                  <NotificationMessage>
                    shared a document with you: {notification.data.documentName}
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
