import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

const baseUrl: string = 'https://mongodb-server-6t4m.onrender.com/api';

export interface Task {
  _id?: string;
  description: string;
  serverId: string;
  userId: string;
}

export const getTasks = async (serverId: string): Promise<AxiosResponse<Task[]>> => {
  try {
    const tasks: AxiosResponse<Task[]> = await axios.get(`${baseUrl}/tasks?serverId=${serverId}`);
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

export const addTask = async (formData: Task): Promise<AxiosResponse<Task>> => {
  try {
    const task = {
      _id: uuidv4(),
      description: formData.description,
      serverId: formData.serverId,
      userId: formData.userId,
    };

    const saveTask = await axios.post(`${baseUrl}/add-task`, task);
    return saveTask.data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const updateTask = async (task: Task): Promise<AxiosResponse<Task>> => {
  try {
    const updatedTask = await axios.put(`${baseUrl}/edit-task/${task._id}`, task);
    return updatedTask.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (_id: string): Promise<AxiosResponse<void>> => {
  try {
    const deleteTask = await axios.delete(`${baseUrl}/delete-task/${_id}`);
    return deleteTask;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
