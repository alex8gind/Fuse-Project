import { createContext, useState, useEffect, useContext } from "react";
import { maxios } from "../utils/maxios"; 
import api from "../services/api";
import axios from "axios";

export const UserContext = createContext(null)

export const mockUsers = [
    {
      userId: "1",
      PId: 'A1B2', 
      firstName: 'Lee',
      lastName: 'May',
      DateOfBirth: '1990-05-15',
      gender: 'female',
      phoneOrEmail: 'lee.may@example.com',
      password: 'hashedPassword123', 
      isVerified: true,
      isBlocked: false,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastLogin: '2023-09-15T14:30:00Z',
      documents: [101, 102, 103],
      createdAt: '2023-01-10T09:00:00Z',
      updatedAt: '2023-01-10T09:00:00Z'
    },
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
    {
      userId: "3",
      PId: 'A3B2', 
      firstName: 'Alex',
      lastName: 'Johnson',
      DateOfBirth: '1995-12-03',
      gender: 'other',
      phoneOrEmail: 'alex.j@example.com',
      password: 'hashedPassword789',
      isVerified: false,
      isBlocked: false,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastLogin: '2023-09-18T16:20:00Z',
      documents: [106, 107, 108, 109],
      createdAt: '2023-04-05T16:20:00Z',
      updatedAt: '2023-04-05T16:20:00Z'
    },
    {
      userId: "4",
      PId: 'A4B2', 
      firstName: 'Emily',
      lastName: 'Brown',
      DateOfBirth: '1992-07-18',
      gender: 'female',
      phoneOrEmail: 'emily92@example.com',
      password: 'hashedPasswordABC',
      isVerified: true,
      isBlocked: false,
      isAdmin: false,
      isActive: false,
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastLogin: '2023-09-10T10:15:00Z',
      documents: [110],
      createdAt: '2023-03-20T13:40:00Z',
      updatedAt: '2023-05-02T09:30:00Z'
    },
    {
      userId: "5",
      PId: 'A5B2', 
      firstName: 'Michael',
      lastName: 'Lee',
      DateOfBirth: '1985-11-30',
      gender: 'male',
      phoneOrEmail: '+9876543210',
      password: 'hashedPasswordXYZ',
      isVerified: true,
      isBlocked: false,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      lastLogin: '2023-09-21T08:50:00Z',
      documents: [111, 112, 113, 114, 115],
      createdAt: '2023-01-05T08:50:00Z',
      updatedAt: '2023-06-10T17:25:00Z'
    }
  ];
  
function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);

    useEffect(() => {
      if (mockUsers.length === 0) {
        console.warn('mockUsers is empty. This may cause issues in components that rely on this data.');
      }
    }, []);

    useEffect(() => {
        // Simulate checking for a stored session
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          getUserProfile();
        } else {
          setLoading(false);
        }
      }, []);
    

const getUserProfile = async () => {
        try {
          const response = api.get('/profile')
          // const response = await maxios.get('success', { user: mockUsers[0] });
          setUser(response.data.user);
        } catch (err) {
          setError('Failed to fetch user profile');
          console.error('Error fetching user profile:', err);
        } finally {
          setLoading(false);
        }
};

const register = async (userData) => {
        try {
          // const response = await api.post('/register', userData);
          const response = await axios.post('http://localhost:5001/api/register', userData);
          // const response = await maxios.post('success', { user: { ...newUser, password: undefined } });
          // mockUsers.push(newUser);
          console.log("REGISTRATION:", response.data);
          setUser(response.data.user);
          return response.data.user;
        } catch (err) {
          setError(err.response?.data?.error || 'Registration failed');
          throw err;
        }
};
    
const login = async (credentials) => {
        try {
          // if (credentials) {         
          //   const response = await api.post('success', { 
          //     user: mockUsers[0],
          //     accessToken: 'mock-access-token',
          //     refreshToken: 'mock-refresh-token'
          //   });
          console.log("CREDENTIALS:", credentials);
            const response = await api.post('/login', credentials);
            setUser(response.data.user );
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.user;
        } catch (err) {
          setError(err.response?.data?.error || 'Login failed');
          throw err;
        }
};
    
const logout = async () => {
        try {
          // await maxios.post('success', { message: 'Logged out successfully' });
          await api.post('/logout');
          setUser(null);
          localStorage.removeItem('userId');
          localStorage.removeItem('accessToken');
        } catch (err) {
          setError('Logout failed');
          throw err; 
        }
};

const updateUserProfile = async (userData) => {
        try {
          const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
          // const response = await maxios.put('success', { user: updatedUser });
          const response = await api.put('/profile', updatedUser);
          setUser(response.data.user || response.data);
          return response.data.user || response.data;
        } catch (err) {
          setError('Failed to update profile');
          throw err;
        }
};

const updateProfilePicture = async (photoFile) => {
  try {
      // In a real scenario, you'd upload the file to a server here
      // const photoUrl = URL.createObjectURL(photoFile);
      // const updatedUser = { ...user, profilePicture: photoUrl, updatedAt: new Date().toISOString() };
      // const response = await maxios.put('success', { user: updatedUser });
      const formData = new FormData();
            formData.append('profilePicture', photoFile);
            const response = await api.put('/users/profile-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
      setUser(response.data.user);
      return response.data.user;
  } catch (err) {
      setError('Failed to update profile picture');
      throw err;
  }
};

const deactivateAccount = async () => {
        try {
          // const response = await maxios.post('success', { message: 'Account deactivated successfully' });
          await api.post('/users/deactivate');
          setUser(prevUser => ({ ...prevUser, isActive: false }));
          localStorage.removeItem('accessToken');
          return response.data;
        } catch (err) {
          setError('Failed to deactivate account');
          throw err;
        }
};

const reactivateAccount = async () => {
      try {
        // const response = await maxios.post('success', { message: 'Account reactivated successfully' });
        const response = await api.post('/users/reactivate');
        setUser(prevUser => ({ ...prevUser, isActive: true }));
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data;
      } catch (err) {
        setError('Failed to reactivate account');
        throw err;
      }
};

const deleteAccount = async () => {
      try {
        // const response = await maxios.delete('success', { message: 'Account deleted successfully' });
        await api.delete('/:userId');
        setUser(null);
        localStorage.removeItem('accessToken');
        return response.data;
      } catch (err) {
        setError('Failed to delete account');
        throw err;
      }
};

const getAllUsers = async () => {
    try {
      // const response = await maxios.get('success', { users: mockUsers });
      const response = await api.get('/users/all');
      return response.data.users;
    } catch (err) {
      setError('Failed to fetch all users');
      throw err;
    }
};

const getReportedUsers = async () => {
    try {
      // For this mock version, we'll return an empty array
      // In a real implementation, you'd fetch this from the backend
      // const response = await maxios.get('success', { reportedUsers: [] });
      const response = await api.get('/users/reported');
      return response.data.reportedUsers;
    } catch (err) {
      setError('Failed to fetch reported users');
      throw err;
    }
};

const getBlockedUsers = async () => {
  try {
    // For this mock version, we'll return an empty array
    // In a real implementation, you'd fetch this from the backend
    // const response = await maxios.get('success', { blockedUsers: [] });
    const response = await api.get('/users/blocked');
    return response.data.blockedUsers;
  } catch (err) {
    setError('Failed to fetch blocked users');
    throw err;
  }
};

const changePassword = async (passwordData) => {
        try {
          // In a real app, you'd hash the password here
          // const response = await maxios.put('success', { message: 'Password changed successfully' });
          const response = await api.put('/change-password', passwordData);
          return response.data;
        } catch (err) {
          setError('Failed to change password');
          throw err;
        }
};
    
const forgotPassword = async (email) => {
        try {
          // const response = await maxios.post('success', { message: 'Password reset instructions sent' });
          const response = await api.post('/forgot-password', { email });
          return response.data;
        } catch (err) {
          setError('Failed to process forgot password request');
          throw err;
        }
};
    
const resetPassword = async (token, newPassword) => {
        try {
          // const response = await maxios.post('success', { message: 'Password reset successfully' });
          const response = await api.post('/reset-password', { token, newPassword });
          return response.data;
        } catch (err) {
          setError('Failed to reset password');
          throw err;
        }
};
    
const sendVerificationEmail = async () => {
        try {
          // const response = await maxios.post('success', { message: 'Email verified successfully' });
          const response = await api.post(`/verify-email`);
          setVerificationStatus(response.data.status)
        } catch (err) {
          setError('Failed to verify email');
          throw err;
        }
};



    return (
        <UserContext.Provider value={{
          user,
          mockUsers: mockUsers.length > 0 ? mockUsers : [],
          setUser,
          getUserProfile,
          loading,
          error,
          login,
          logout,
          register,
          updateUserProfile,
          updateProfilePicture,
          deactivateAccount,
          reactivateAccount,
          deleteAccount,
          getAllUsers,
          getReportedUsers,
          getBlockedUsers,
          changePassword,
          forgotPassword,
          resetPassword,
          sendVerificationEmail,
          verificationStatus

        }}>
          {children}
        </UserContext.Provider>
      );
}

export const useUserContext = () => useContext(UserContext)

export default UserProvider