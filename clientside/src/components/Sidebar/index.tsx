import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';

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

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
                    <p>This is the sidebar component that slides open from the left side of the screen.</p>
                    <nav>
                        <ul>
                            <li>
                                <Link to={'server/1'}>Server 1</Link>
                            </li>
                            <li>
                                <Link to={'server/2'}>Server 2</Link>
                            </li>
                        </ul>
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