import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../../api/taskApi';

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    date: string;
    editing: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (formData: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (_id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (formData: Task) => {
    try {
      const response = await addTask(formData);
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
