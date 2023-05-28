import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerContext } from '../../hooks/contexts/ServerContext';
import { useParams } from 'react-router';

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

export const Server: React.FC = () => {
  const { getServer } = useServerContext();
  const { id } = useParams();
  const _id: string = id ? id : '';
  console.log(_id, id);
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [server, setServer] = useState<any>(null);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await getServer(_id);
        console.log(response);
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
        const updatedTaskList = [...taskList];
        updatedTaskList[editIndex] = task;
        setTaskList(updatedTaskList);
        setEditIndex(null);
      } else {
        // Adding new task
        setTaskList([...taskList, task]);
      }
      setTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const handleEditTask = (index: number) => {
    setTask(taskList[index]);
    setEditIndex(index);
  };

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>{server}</Title>
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
        {taskList.map((task, index) => (
          <TaskItem key={index}>
            <TaskContent>
              <TaskText>{task}</TaskText>
              <EditButton onClick={() => handleEditTask(index)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDeleteTask(index)}>Delete</DeleteButton>
            </TaskContent>
            <TaskInfo>
              <span>
                Author: John Doe
              </span>
              <span>
                {' '}at 10:00 AM
              </span>
            </TaskInfo>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};



