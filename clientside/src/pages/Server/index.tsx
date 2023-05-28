import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Server, useServerContext } from '../../hooks/contexts/ServerContext';
import { useParams } from 'react-router';
import { useTaskContext } from '../../hooks/contexts/TaskContext';
import { Task } from '../../api/taskApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0058cc;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
`;

const TaskItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TaskContent = styled.div`
  display: flex;
  align-items: center;
`;

const TaskText = styled.span`
  flex: 1;
  margin-right: 10px;
`;

const TaskInfo = styled.div`
  font-size: 12px;
  color: #777;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #ff3333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #cc0000;
  }
`;

const EditButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #49aa4e;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #37833d;
  }
`;

export const ServerPage: React.FC = () => {
  const { getServer } = useServerContext();
  const { tasks, fetchTasks, updateTask, addTask } = useTaskContext();
  const { id } = useParams();
  const _id: string = id ? id : '';
  const [task, setTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [server, setServer] = useState<Server | undefined>(undefined);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response: Server | undefined = await getServer(_id);
        setServer(response);
      } catch (error) {
        console.error('Error fetching server:', error);
      }
    };

    fetchServer();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      if (editIndex !== null) {
        // Editing existing task
        // updateTask();
        setEditIndex(null);
      } else {
        // Adding new task
        addTask({ description: task, serverId: _id, userId: "0107" });
      }
      setTask('');
    }
  };

  const handleDeleteTask = async (index: number) => {
    // const taskId = tasks[index]._id;
    // try {
    //   await deleteTask(taskId);
    //   // After deleting the task, you may want to update the local tasks state.
    //   setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
    // } catch (error) {
    //   console.error('Error deleting task:', error);
    // }
  };

  const handleEditTask = (index: number) => {
    setTask(tasks[index].description);
    setEditIndex(index);
  };

  if (!server || !tasks) {
    return <div>Loading...</div>;
  }

  
  
  const taskArray = Object.values(tasks); // Convert tasks object to an array
  console.log(taskArray);

  // So something is wrong with how I grab tasks

  return (
    <Container>
      <Title>{server.title}</Title>
      <InputContainer>
        <TaskInput
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={handleInputChange}
        />
        <AddButton onClick={handleAddTask}>{editIndex !== null ? 'Save' : 'Add'}</AddButton>
      </InputContainer>
      <TaskList>
        {taskArray ? (
          taskArray.map((task, index) => {
            return (
              <TaskItem key={index}>
                <TaskContent>
                  <TaskText></TaskText>
                  <EditButton onClick={() => handleEditTask(index)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteTask(index)}>Delete</DeleteButton>
                </TaskContent>
                <TaskInfo>
                  <span>Author: John Doe</span>
                  <span>at 10:00 AM</span>
                </TaskInfo>
              </TaskItem>
            )
            
          })
        ) : (
          <p>No tasks</p>
        )} 
      </TaskList>
    </Container>
  );
};
