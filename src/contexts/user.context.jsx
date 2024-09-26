import { createContext, useState, useEffect } from "react";
import { maxios } from "../utils/maxios"; 

export const UserContext = createContext(null)

export const mockUsers = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      DateOfBirth: '1990-05-15',
      gender: 'male',
      phoneOrEmail: 'john.doe@example.com',
      password: 'hashedPassword123', 
      isVerified: true,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://example.com/profiles/john-doe.jpg',
      lastLogin: '2023-09-15T14:30:00Z',
      documents: [101, 102, 103],
      createdAt: '2023-01-10T09:00:00Z',
      updatedAt: '2023-01-10T09:00:00Z'
    },
    {
      userId: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      DateOfBirth: '1988-09-22',
      gender: 'female',
      phoneOrEmail: '+1234567890',
      password: 'hashedPassword456',
      isVerified: true,
      isAdmin: true,
      isActive: true,
      profilePicture: 'https://example.com/profiles/jane-smith.jpg',
      lastLogin: '2023-09-20T09:45:00Z',
      documents: [104, 105],
      createdAt: '2023-02-15T14:30:00Z',
      updatedAt: '2023-03-01T11:45:00Z'
    },
    {
      userId: 3,
      firstName: 'Alex',
      lastName: 'Johnson',
      DateOfBirth: '1995-12-03',
      gender: 'other',
      phoneOrEmail: 'alex.j@example.com',
      password: 'hashedPassword789',
      isVerified: false,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://example.com/profiles/alex-johnson.jpg',
      lastLogin: '2023-09-18T16:20:00Z',
      documents: [106, 107, 108, 109],
      createdAt: '2023-04-05T16:20:00Z',
      updatedAt: '2023-04-05T16:20:00Z'
    },
    {
      userId: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      DateOfBirth: '1992-07-18',
      gender: 'female',
      phoneOrEmail: 'emily92@example.com',
      password: 'hashedPasswordABC',
      isVerified: true,
      isAdmin: false,
      isActive: false,
      profilePicture: 'https://example.com/profiles/emily-brown.jpg',
      lastLogin: '2023-09-10T10:15:00Z',
      documents: [110],
      createdAt: '2023-03-20T13:40:00Z',
      updatedAt: '2023-05-02T09:30:00Z'
    },
    {
      userId: 5,
      firstName: 'Michael',
      lastName: 'Lee',
      DateOfBirth: '1985-11-30',
      gender: 'male',
      phoneOrEmail: '+9876543210',
      password: 'hashedPasswordXYZ',
      isVerified: true,
      isAdmin: false,
      isActive: true,
      profilePicture: 'https://example.com/profiles/michael-lee.jpg',
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

    useEffect(() => {
        // Simulate checking for a stored session
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          getUserProfile();
        } else {
          setLoading(false);
        }
      }, []);

      useEffect(()=>{
        console.log("DEBUGG in UserProvider: user", user);
    }, [user])

      const getUserProfile = async () => {
        try {
          // const response = api.get('/users/profile')
          const response = await maxios.get('success', { user: mockUsers[0] });
          console.log("DEBUGG:getUserProfile", response.data.user);
          setUser(response.data.user);
        } catch (err) {
          setError('Failed to fetch user profile');
        } finally {
          setLoading(false);
        }
      };

      const register = async (userData) => {
        try {
          const newUser = {
            ...userData,
            userId: mockUsers.length + 1,
            isVerified: false,
            isAdmin: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          const response = await maxios.post('success', { user: { ...newUser, password: undefined } });
          mockUsers.push(newUser);
          return response.data;
        } catch (err) {
          setError('Registration failed');
          throw err;
        }
      };
    
    
      const login = async (credentials) => {
        try {
          if (credentials) {         
            const response = await maxios.post('success', { 
              user: mockUsers[0],
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token'
            });
            setUser(response.data.user);
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (err) {
          setError(err.message || 'Login failed');
          throw err;
        }
      };
    
      const logout = async () => {
        try {
          await maxios.post('success', { message: 'Logged out successfully' });
          setUser(null);
          localStorage.removeItem('userId');
          localStorage.removeItem('accessToken');
        } catch (err) {
          setError('Logout failed');
        }
      };
    

      const updateUserProfile = async (userData) => {
        try {
          const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
          const response = await maxios.put('success', { user: updatedUser });
          setUser(response.data.user);
          return response.data.user;
        } catch (err) {
          setError('Failed to update profile');
          throw err;
        }
      };
    
      const changePassword = async (passwordData) => {
        try {
          // In a real app, you'd hash the password here
          const response = await maxios.put('success', { message: 'Password changed successfully' });
          return response.data;
        } catch (err) {
          setError('Failed to change password');
          throw err;
        }
      };
    
      const forgotPassword = async (email) => {
        try {
          const response = await maxios.post('success', { message: 'Password reset instructions sent' });
          return response.data;
        } catch (err) {
          setError('Failed to process forgot password request');
          throw err;
        }
      };
    
      const resetPassword = async (token, newPassword) => {
        try {
          const response = await maxios.post('success', { message: 'Password reset successfully' });
          return response.data;
        } catch (err) {
          setError('Failed to reset password');
          throw err;
        }
      };
    
      const verifyEmail = async (token) => {
        try {
          const response = await maxios.post('success', { message: 'Email verified successfully' });
          return response.data;
        } catch (err) {
          setError('Failed to verify email');
          throw err;
        }
      };

    // const [loggedinUser, setLoggedinUser] = useState({
    //     uid: "2",
    //     createdAt: 1718289241,
    //     firstname: "Sara",
    //     lastname: "Smith",
    //     profilePic: "path/to/pic",
    //     documents: [],
    //     connections: []
    // })
    // return (
    //     <UserContext.Provider value={{loggedinUser, setLoggedinUser}}>
    //         {children}
    //     </UserContext.Provider>
    // )

    return (
        <UserContext.Provider value={{
          user,
          loading,
          error,
          login,
          logout,
          register,
          updateUserProfile,
          changePassword,
          forgotPassword,
          resetPassword,
          verifyEmail
        }}>
          {children}
        </UserContext.Provider>
      );
    }

export default UserProvider