import React, { createContext, useState, useEffect, useContext } from 'react';
// import { Server } from '../models/server.model';

interface Server {
    title: string;
    tasks: number;
    description: string;
    createdBy: number;
    active: boolean;
}

// Define the context type
interface ServerContextType {
  servers: Server[];
  addServer: (server: Server) => void;
  updateServer: (id: string, server: Server) => void;
  deleteServer: (id: string) => void;
}

// Create the context
const ServerContext = createContext<ServerContextType | undefined>(undefined);

// Create the provider component
export const ServerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [servers, setServers] = useState<Server[]>([]);

  // Fetch the servers from the API
  useEffect(() => {
    const fetchServers = async () => {
      try {
        // Perform API request to get the servers
        // Update the state with the fetched servers
      } catch (error) {
        // Handle the error
      }
    };

    fetchServers();
  }, []);

  // Function to add a new server
  const addServer = (server: Server) => {
    // Perform API request to add the server
    // Update the state with the new server
  };

  // Function to update an existing server
  const updateServer = (id: string, server: Server) => {
    // Perform API request to update the server
    // Update the state with the updated server
  };

  // Function to delete a server
  const deleteServer = (id: string) => {
    // Perform API request to delete the server
    // Update the state by removing the deleted server
  };

  return (
    <ServerContext.Provider value={{ servers, addServer, updateServer, deleteServer }}>
      {children}
    </ServerContext.Provider>
  );
};

// Custom hook to consume the ServerContext
export const useServerContext = () => {
  const context = useContext(ServerContext);

  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }

  return context;
};
