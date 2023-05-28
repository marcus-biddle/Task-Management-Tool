import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, addTask, updateTask, deleteTask, Task } from '../../api/taskApi';

interface TaskContextType {
  tasks: Task[];
  addTask: (formData: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (_id: string) => Promise<void>;
  fetchTasks: (serverId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks('');
  }, []);

  const fetchTasks = async (serverId: string) => {
    try {
      const response = await getTasks(serverId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (formData: Task) => {
    try {
      console.log('formData', formData);
      const response = await addTask(formData);
      console.log(response);
      const addedTask = response.data;
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      const response = await updateTask(task);
      const updatedTask = response.data;
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t));
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await deleteTask(_id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== _id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const taskContextValue: TaskContextType = {
    tasks,
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    fetchTasks,
  };

  return (
    <TaskContext.Provider value={taskContextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};
