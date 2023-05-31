import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  deleteUser,
  User,
} from '../../api/userApi';

interface UserContextType {
  users: any[]; 
  addUser: (userData: any) => Promise<any>; 
  removeUserById: (userId: string) => Promise<void>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]); 

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      console.log('context users', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUserById = async (userId: string) => {
  //   try {
  //     const response: AxiosResponse<any> = await getUserById(userId);
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  const addUser = async (userData: any) => {
    try {
      const response: User = await createUser(userData);
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // const updateUserById = async (userId: string, userData: any) => {
  //   try {
  //     const response: AxiosResponse<any> = await updateUser(userId, userData);
  //     // Handle the updated user data as needed
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };

  const removeUserById = async (userId: string) => {
    try {
      const { user, users} = await deleteUser(userId);
      console.log("Deleted user:", user);
      setUsers(users);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userContextValue: UserContextType = {
    users,
    addUser,
    removeUserById,
  };

  return (
    <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};