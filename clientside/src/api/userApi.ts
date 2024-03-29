import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://mongodb-server-6t4m.onrender.com/api/users';

export interface User {
    _id: string;
    username: string;
    password: string;
  }

// Get all users
export const getUsers = async () => {
  try {
    const users = await axios.get(baseUrl);
    return users.data.users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<AxiosResponse<any>> => {
  try {
    const user: AxiosResponse<any> = await axios.get(`${baseUrl}/${userId}`);
    console.log('getUserById api', user.data);
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

// Create a new user
export const createUser = async (userData: any) => {
  try {
    const user = await axios.post(baseUrl + '-create', userData);
    console.log('createUser api', user.data.user);
    return user.data.user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

// Update user by ID
export const updateUser = async (userId: string, userData: any): Promise<AxiosResponse<any>> => {
  try {
    const user: AxiosResponse<any> = await axios.put(`${baseUrl}/${userId}`, userData);
    console.log('updateUser api', user.data);
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

// Delete user by ID
export const deleteUser = async (userId: string) => {
  try {
    const user: AxiosResponse<any> = await axios.delete(`${baseUrl}/${userId}`);
    return user.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
