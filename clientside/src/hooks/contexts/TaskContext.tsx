import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, addTask, updateTask, deleteTask, Task } from '../../api/taskApi';

interface TaskContextType {
  tasks: Task[];
  addTask: (formData: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (_id: string) => Promise<void>;
  fetchTasks: (serverId: string) => Promise<Task[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (serverId: string): Promise<Task[]> => {
    try {
      const response = await getTasks(serverId);
      const tasks: Task[] = response.data;
      setTasks(tasks);
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };
  

  useEffect(() => {
    fetchTasks('6472782d178c83559454bfb7');
  }, []);

  const handleAddTask = async (formData: Task) => {
    try {
      const response = await addTask(formData);
      const addedTask = response.data;
      setTasks(prevTasks => {
        if (Array.isArray(prevTasks)) {
          return [...prevTasks, addedTask];
        } else {
          return [addedTask];
        }
      });
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
