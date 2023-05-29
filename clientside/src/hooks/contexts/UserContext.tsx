import React, { createContext, useContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  User,
} from '../../api/userApi';

interface UserContextType {
  users: any[]; // Modify the type to match your user data structure
  fetchUsers: () => Promise<User>;
  fetchUserById: (userId: string) => Promise<void>;
  addUser: (userData: any) => Promise<any>; // Modify the type to match your user data structure
  updateUserById: (userId: string, userData: any) => Promise<void>; // Modify the type to match your user data structure
  removeUserById: (userId: string) => Promise<void>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]); // Modify the type to match your user data structure

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log('fetchUsers response', response);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUserById = async (userId: string) => {
    try {
      const response: AxiosResponse<any> = await getUserById(userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const addUser = async (userData: any) => {
    try {
      const existingUser = users.filter(user => user._id === userData._id);
      if (existingUser) {
        console.log('exisiting user found:', existingUser);
        return existingUser;
      }
      const response: User = await createUser(userData);
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUserById = async (userId: string, userData: any) => {
    try {
      const response: AxiosResponse<any> = await updateUser(userId, userData);
      // Handle the updated user data as needed
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const removeUserById = async (userId: string) => {
    try {
      const response: AxiosResponse<any> = await deleteUser(userId);
      // Handle the deletion response as needed
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userContextValue: UserContextType = {
    users,
    fetchUsers,
    fetchUserById,
    addUser,
    updateUserById,
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