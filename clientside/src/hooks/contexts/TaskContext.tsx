import React, { createContext, useState, useEffect, useContext } from 'react';
// import { Task } from '../models/task.model';

interface Task {
    title: string;
    description: string;
    completed: string;
    date: string;
    editing: boolean;
    userId: number;
    serverId: number;
}

// Define the context type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the provider component
export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch the tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Perform API request to get the tasks
        // Update the state with the fetched tasks
      } catch (error) {
        // Handle the error
      }
    };

    fetchTasks();
  }, []);

  // Function to add a new task
  const addTask = (task: Task) => {
    // Perform API request to add the task
    // Update the state with the new task
  };

  // Function to update an existing task
  const updateTask = (id: string, task: Task) => {
    // Perform API request to update the task
    // Update the state with the updated task
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    // Perform API request to delete the task
    // Update the state by removing the deleted task
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to consume the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};
