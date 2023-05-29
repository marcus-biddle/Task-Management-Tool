import { Outlet, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useServerContext } from '../../hooks/contexts/ServerContext';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-345px')};
  width: 345px;
  height: 100vh;
  background-color: #f0f0f0;
  transition: left 0.3s ease-in-out;
`;

const SidebarButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 10px;
  left: ${({ isOpen }) => (isOpen ? '350px' : '10px')};
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease-in-out;
`;

const SidebarContent = styled.div`
  padding: 20px;
`;

const AddServerForm = styled.form`
  margin-top: 20px;
  margin-right: 1.5rem;
`;

const AddServerInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  const { id } = useParams();
  const _id: string = id ? id : '';
  const [isOpen, setIsOpen] = useState(false);
  const [newServerTitle, setNewServerTitle] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic to save the new server title
    console.log('New Server Title:', newServerTitle);
    addServer()
    // Reset the input field after saving
    setNewServerTitle('');
  };

  return (
    <>
        <div style={{ display: 'flex'}}>
            <div style={{ marginRight: '255px'}}>
                <SidebarButton isOpen={isOpen} onClick={toggleSidebar}>
                    {isOpen ? 'Close' : 'Open'}
                </SidebarButton>
                <SidebarContainer isOpen={isOpen}>
                    <SidebarContent>
                    <h2>Task Management Servers</h2>
                    <p>Click on a server or create your own.</p>
                    <AddServerForm onSubmit={handleAddServer}>
                      <AddServerInput
                        type="text"
                        placeholder="Enter server title"
                        value={newServerTitle}
                        onChange={(e) => setNewServerTitle(e.target.value)}
                      />
                      <button type="submit">Create Server</button>
                    </AddServerForm>
                    
                    <nav>
                      <SidebarList>
                        {servers.map((server, index) => (
                          <SidebarListItem key={index}>
                            <Link to={`servers/${server._id}`}>Server: {server.title}</Link>
                          </SidebarListItem>
                        ))}
                      </SidebarList>
                    </nav>
                    </SidebarContent>
                </SidebarContainer>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </div>
        
    </>
  )
};