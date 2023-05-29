import React, { createContext, useContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../api/userApi';

interface UserContextType {
  users: any[]; // Modify the type to match your user data structure
  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
  addUser: (userData: any) => Promise<void>; // Modify the type to match your user data structure
  updateUserById: (userId: string, userData: any) => Promise<void>; // Modify the type to match your user data structure
  removeUserById: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  users: [],
  fetchUsers: () => Promise.resolve(),
  fetchUserById: (userId: string) => Promise.resolve(),
  addUser: (userData: any) => Promise.resolve(),
  updateUserById: (userId: string, userData: any) => Promise.resolve(),
  removeUserById: (userId: string) => Promise.resolve(),
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([]); // Modify the type to match your user data structure

  const fetchUsers = async () => {
    try {
      const response: AxiosResponse<any> = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserById = async (userId: string) => {
    try {
      const response: AxiosResponse<any> = await getUserById(userId);
      // Handle the fetched user data as needed
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const addUser = async (userData: any) => {
    try {
      const response: AxiosResponse<any> = await createUser(userData);
      // Handle the created user data as needed
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
