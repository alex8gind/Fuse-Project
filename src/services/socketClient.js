import { io } from 'socket.io-client';

let socket = null;
let reconnectTimer = null;
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECTION_ATTEMPTS = 5;

export const initializeSocket = async (token) => {
  if (socket?.connected) {
    console.log('Socket already connected, reusing existing connection');
    return socket;
  }

  if (!token) {
    console.error('No token provided for socket initialization');
    return null;
  }

  try {
    // Clean up existing connection if any
    if (socket) {
      console.log('Cleaning up existing socket connection');
      socket.disconnect();
      socket = null;
    }

    // Make sure VITE_API_URL doesn't end with a slash
    const baseURL = import.meta.env.VITE_SOCKET_URL || 
      import.meta.env.VITE_API_URL.replace('/api', '');
    
    console.log('Initializing socket with baseURL:', baseURL);
    console.log('Token present:', !!token);

    socket = io(baseURL, {
      auth: { token },
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: MAX_RECONNECTION_ATTEMPTS,
      transports: ['websocket'],
      timeout: 10000,
      path: '/socket.io'
    });

    let reconnectionAttempts = 0;

    socket.on('connect', () => {
      console.log('Socket connected successfully');
      console.log('Socket ID:', socket.id);
      reconnectionAttempts = 0;
      if (reconnectTimer) {
        clearInterval(reconnectTimer);
        reconnectTimer = null;
      }
    });

    socket.on('connect_error', async (error) => {
      console.error('Socket connection error:', error.message);
      console.error('Connection details:', {
        url: baseURL,
        token: token ? 'Present' : 'Missing',
        transport: socket.io.engine?.transport?.name
      });
      
      reconnectionAttempts++;
      
      if (reconnectionAttempts >= MAX_RECONNECTION_ATTEMPTS) {
        console.error('Max reconnection attempts reached');
        disconnectSocket();
        return;
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        if (!reconnectTimer) {
          reconnectTimer = setInterval(() => {
            console.log('Attempting to reconnect...');
            const currentToken = localStorage.getItem('accessToken');
            if (currentToken && currentToken !== token) {
              initializeSocket(currentToken);
            }
          }, RECONNECT_INTERVAL);
        }
      }
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Add debugging for all events
    socket.onAny((eventName, ...args) => {
      console.log('Received event:', eventName, 'with data:', args);
    });

    console.log('Attempting to connect socket...');
    socket.connect();
    
    return socket;

  } catch (error) {
    console.error('Error initializing socket:', error);
    return null;
  }
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (reconnectTimer) {
    clearInterval(reconnectTimer);
    reconnectTimer = null;
  }
  
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  console.log('Current socket state:', {
    exists: !!socket,
    connected: socket?.connected || false,
    id: socket?.id
  });
  return socket;
};

export const isSocketConnected = () => {
  const connected = socket?.connected || false;
  console.log('Checking socket connection:', connected);
  return connected;
};