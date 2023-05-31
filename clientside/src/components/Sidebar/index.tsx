import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useServerContext } from '../../hooks/contexts/ServerContext';
import { Server } from '../../api/serverApi';
import { LogoutButton } from '../../pages/Home';

const Container = styled.div`
  margin-right: 255px;

  @media (max-width: 768px) {
    margin-right: 1.75rem;
  }
`;
const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-345px')};
  width: 345px;
  height: 100vh;
  background-color: #f0f0f0;
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    z-index: 90;
    width: 300px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  }
`;

const SidebarButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 10px;
  left: ${({ isOpen }) => (isOpen ? '350px' : '10px')};
  width: 30px;
  height: 40px;
  font-size: 32px;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    z-index: 100;
    left: ${({ isOpen }) => (isOpen ? 'calc(100% - 85px)' : '10px')};
  }
`;

const SidebarContent = styled.div`
  padding: 20px;
`;

const AddServerForm = styled.form`
  margin-top: 20px;
  margin-right: 1.5rem;

  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
  }
`;

const AddServerInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 18px;
  }
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-top: 20px;
`;

const SidebarListItem = styled.li`
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: #333;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Sidebar = () => {
  const { servers, addServer } = useServerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [newServerTitle, setNewServerTitle] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } else {
        setCurrentUser(null);
      }
    };
  
    const interval = setInterval(checkLocalStorage, 1000);
  
    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [currentUser]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddServer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentUser) {
      // Add your logic to save the new server title
      console.log('New Server Title:', newServerTitle);
      const newServer: Server = { title: newServerTitle, createdBy: currentUser.username, active: true };
      await addServer(newServer);
      // Reset the input field after saving
      setNewServerTitle('');
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Container>
          <SidebarButton isOpen={isOpen} onClick={toggleSidebar}>
            {isOpen ? '<' : '>'}
          </SidebarButton>
          <SidebarContainer isOpen={isOpen}>
            <SidebarContent>
              <Link to={'/'}>
                <h2>Task Management Servers</h2>
              </Link>
              <p>{currentUser ? `Welcome ${currentUser.username}! Click on a server or create your own.` : 'Please sign in to use this feature.'}</p>
              <AddServerForm onSubmit={handleAddServer}>
                <AddServerInput
                  type="text"
                  placeholder="Enter server title"
                  value={newServerTitle}
                  onChange={(e) => setNewServerTitle(e.target.value)}
                />
                <LogoutButton type="submit">Create Server</LogoutButton>
              </AddServerForm>

              {currentUser ? (
                <nav>
                  <SidebarList>
                    {servers.map((server, index) => (
                      <SidebarListItem key={index}>
                        <Link to={`servers/${server._id}`}>Server: {server.title}</Link>
                      </SidebarListItem>
                    ))}
                  </SidebarList>
                </nav>
              ) : (
                <></>
              )}
            </SidebarContent>
          </SidebarContainer>
        </Container>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
};
