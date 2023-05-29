import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, addTask, updateTask, deleteTask, Task } from '../../api/taskApi';

interface TaskContextType {
  tasks: Task[];
  addTask: (formData: Task) => Promise<Task[]>;
  updateTask: (task: Task) => Promise<Task[]>;
  deleteTask: (_id: string) => Promise<void>;
  fetchTasks: (serverId: string) => Promise<Task[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (serverId: string): Promise<Task[]> => {
    try {
      const { status, data } = await getTasks(serverId);
      return data.tasks;
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
      const { status, data } = await addTask(formData);
  
      if (status === 200) {
        console.log('Added task:', data.task);
        setTasks(data.tasks);
        return data.tasks;
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  const handleUpdateTask = async (task: Task) => {
    try {
      const { status, data }  = await updateTask(task);

      if (status === 200) {
        console.log('Updated task:', data.task);
        setTasks(data.tasks);
        return data.tasks;
      } else {
        console.log('Failed to update task');
      }
      
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };
  

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { status, data } = await deleteTask(taskId);
  
      if (status === 200) {
        console.log('Deleted task:', data.task);
        setTasks(data.tasks);
      } else {
        console.log('Failed to delete task');
      }
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
