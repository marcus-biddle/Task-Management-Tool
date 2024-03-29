import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerContext } from '../../hooks/contexts/ServerContext';
import { useNavigate, useParams } from 'react-router';
import { useTaskContext } from '../../hooks/contexts/TaskContext';
import { Task } from '../../api/taskApi';
import { Server } from '../../api/serverApi';
import { useUserContext } from '../../hooks/contexts/UserContext';
import { getName, getNamesInServer } from '../../helpers/api';
import { formatDateTime } from '../../helpers/random';

const Container = styled.div`
  display: flex;
  position: relative;
  padding-left: 10rem;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding-left: .75rem;
    width: 100%;
  }

  @media (min-width: 1200px) {
    padding-right: 10rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 18rem;
  overflow: auto;

  @media (max-width: 768px) {
    padding-right: 0;
    padding: 0;
  }

  @media (min-width: 1200px) {
    padding-right: 29rem;
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  height: 95vh;
  right: ${({ isOpen }) => (isOpen ? '0' : '-195px')};
  width: 300px;
  background-color: #f5f5f5;
  padding: 20px;
  transition: right 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    transition: right 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    right: ${({ isOpen }) => (isOpen ? '-14px' : '-150px')};
    height: 88vh;
    top: 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ServerTitle = styled.h1`
  font-size: 28px;
  text-align: center;
  flex: 1;
`;

const SidebarTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ActionContent = styled.div`
  margin-top: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 10px;
  padding-right: 14rem;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;

  @media (max-width: 768px) {
    padding: 7px;
    padding-right: 100px;
  }
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

  @media (max-width: 768px) {
    margin-right: 12px;
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
  margin-left: 10px;

  &:hover {
    background-color: #37833d;
  }
`;

const EditServerTitleInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const ServerSettingsButton = styled.button<{ isOpen: boolean }>`
  padding: 10px;
  font-size: 50px;
  color: ${({ isOpen }) => (isOpen ? '#f44336' : '#4caf50')};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ isOpen }) => (isOpen ? '#e53935' : '#43a047')};
  }
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  margin-bottom: 8px;
`;

const EditServerTitleButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SaveServerTitleButton = styled.button`
  margin-top: 10px;
  margin-right: 8px;
  padding: 8px 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #1d923b;
  }
`;

const CancelEditServerTitleButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const DeleteServerButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const GoBackButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: transparent;
  color: #17a2b8;;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

export const ServerPage: React.FC = () => {
  const { getServer, updateServer, deleteServer } = useServerContext();
  const { tasks, fetchTasks, updateTask, addTask, deleteTask } = useTaskContext();
  const { users } = useUserContext();
  const { id } = useParams();
  const _id: string = id ? id : '';
  const [task, setTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<Task | null>(null);
  const [server, setServer] = useState<Server>();
  const [serverTasks, setServerTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newServerTitle, setNewServerTitle] = useState('');
  // const [users, setUsers] = useState<any>([]); // fix type
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const names = getNamesInServer(serverTasks, users);

  useEffect(() => {
    const fetchServerAndTasks = async () => {
      try {
        const response: Server = await getServer(_id);
        const taskResponse: any = await fetchTasks(_id);
        setServer(response);
        setServerTasks(taskResponse);
      } catch (error) {
        console.error('Error fetching server:', error);
      }
    };

      const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  
    fetchServerAndTasks();
  }, [_id]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = async () => {
    if (currentUser) {
      if (task.trim() !== '') {
        if (editIndex !== null) {
          // Editing existing task
          const updatedTask: Task = { ...editIndex, description: task, userId: currentUser._id };
          await updateTask(updatedTask);
          const response = await fetchTasks(_id);
          setServerTasks(response);
          setEditIndex(null);
        } else {
          // Adding new task
          const newTask: Task = { description: task, serverId: _id, userId: currentUser._id, updatedAt: '' };
          try {
            const response = await addTask(newTask);
            setServerTasks(response);
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
        setTask('');
      }
    }
    
  };

  const handleDeleteTask = async (task: Task) => {
    const id = task._id ? task._id : ''
    try {
      await deleteTask(id);
      setServerTasks(prevTasks => prevTasks.filter((t: Task) => t._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setTask(task.description);
    setEditIndex(task);
  };

  const handleServerDelete = async () => {
    try {
      // Delete server logic here
      navigate("/");
      await deleteServer(_id);
    } catch (error) {
      console.error('Error deleting server:', error);
    }
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEditServerTitle = () => {
    setIsEditingTitle(true);
    setNewServerTitle(''); // Set the initial value of the input to the current server title
  };

  const handleSaveServerTitle = async () => {
    setIsEditingTitle(false);
    // Update server title
    const newServer: Server = { ...server, title: newServerTitle };
    setServer(newServer);
  
    // Perform the server update request
    try {
      await updateServer(newServer);
    } catch (error) {
      console.error('Error updating server title:', error);
    }
  };
  

  const handleCancelEditServerTitle = () => {
    setIsEditingTitle(false);
  };

  if (!server || !tasks) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MainContent>
        <TitleContainer>
          <ServerTitle>{server.title}</ServerTitle>
          <ServerSettingsButton isOpen={isOpen} onClick={handleSidebarToggle}>
            {isOpen ? '-' : '+'}
          </ServerSettingsButton>
        </TitleContainer>
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
          {serverTasks && users && currentUser ? (
            serverTasks.map((task: Task, index) => {
              const name = getName(users, task.userId) ? getName(users, task.userId) : { username: currentUser.username };
              const time = formatDateTime(task.updatedAt);
              return (
                <TaskItem key={index}>
                  <TaskContent>
                    <TaskText>{task.description}</TaskText>
                    <EditButton onClick={() => handleEditTask(task)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDeleteTask(task)}>Delete</DeleteButton>
                  </TaskContent>
                  <TaskInfo>
                    <span>{task.serverId ? name.username : ''}</span>
                    <span> at {time}</span>
                  </TaskInfo>
                </TaskItem>
              )
              
            })
          ) : (
            <p>Please sign in to view any Tasks in this server</p>
          )} 
        </TaskList>
      </MainContent>
      <Sidebar isOpen={isOpen}>
            <ActionContent>
            <GoBackButton onClick={handleSidebarToggle}>
              Go back
            </GoBackButton>
            <h1>Server - {server.title}</h1>
              {isEditingTitle ? (
                <div>
                  <EditServerTitleInput
                    type="text"
                    value={newServerTitle}
                    onChange={(e) => setNewServerTitle(e.target.value)}
                  />
                  <SaveServerTitleButton onClick={handleSaveServerTitle}>Save</SaveServerTitleButton>
                  <CancelEditServerTitleButton onClick={handleCancelEditServerTitle}>Cancel</CancelEditServerTitleButton>
                </div>
              ) : (
                <div>
                  <SidebarTitle>Actions</SidebarTitle>
                  <EditServerTitleButton onClick={handleEditServerTitle}>Edit Server Title</EditServerTitleButton>
                </div>
              )}
              <DeleteServerButton onClick={handleServerDelete}>Delete Server</DeleteServerButton>
              <SidebarTitle>Users</SidebarTitle>
              <UserList>
                {names ? (
                  names.map((name, index) => {
                    return (
                      <UserItem key={index}>{name}</UserItem>
                    )
                })
                ) : (
                  <p>No users</p>
                )}
              </UserList>
            </ActionContent>
        <p style={{ opacity: '.65'}}>Server created by {server.createdBy}</p>
      </Sidebar>
    </Container>
  );
};
