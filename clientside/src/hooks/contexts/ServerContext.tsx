import React, { createContext, useState, useEffect, useContext } from 'react';
import { getServers, addServer, updateServer, deleteServer, getServer } from '../../api/serverApi';

export interface Server {
  _id: string;
  title: string;
  tasks: number;
  description: string;
  createdBy: number;
  active: boolean;
}

interface ServerContextType {
  servers: Server[];
  addServer: (formData: any) => Promise<void>;
  updateServer: (server: Server) => Promise<void>;
  deleteServer: (id: string) => Promise<void>;
  getServer: (id: string) => Promise<Server | undefined>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await getServers();
        const { data } = response;
        setServers(data.servers);
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    fetchServers();
  }, []);

  const handleAddServer = async (formData: any) => {
    try {
      const response = await addServer(formData);
      const { server, message } = response.data;
      setServers((prevServers) => [...prevServers, server]);
      console.log(message);
    } catch (error) {
      console.error('Error adding server:', error);
      // Perform any additional error handling actions
    }
  };

  const handleUpdateServer = async (updatedServer: Server) => {
    try {
      const response = await updateServer(updatedServer);
      const { server, message } = response.data;
      setServers((prevServers) => {
        const updatedServers = prevServers.map((s) => (s._id === server._id ? server : s));
        return updatedServers;
      });
      console.log(message);
    } catch (error) {
      console.error('Error updating server:', error);
      // Perform any additional error handling actions
    }
  };

  const handleDeleteServer = async (id: string) => {
    try {
      const response = await deleteServer(id);
      const { server, message } = response.data;
      setServers((prevServers) => prevServers.filter((s) => s._id !== server._id));
      console.log(message);
    } catch (error) {
      console.error('Error deleting server:', error);
      // Perform any additional error handling actions
    }
  };

  const handleGetServer = async (id: string): Promise<Server | undefined> => {
    try {
      const response = await getServer(id);
      const { data } = response;
      return data.server;
    } catch (error) {
      console.error('Error fetching server:', error);
      // Perform any additional error handling actions
      return undefined;
    }
  };

  const serverContextValue: ServerContextType = {
    servers,
    addServer: handleAddServer,
    updateServer: handleUpdateServer,
    deleteServer: handleDeleteServer,
    getServer: handleGetServer,
  };

  return (
    <ServerContext.Provider value={serverContextValue}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = (): ServerContextType => {
  const context = useContext(ServerContext);

  if (!context) {
    throw new Error('useServerContext must be used within a ServerProvider');
  }

  return context;
};
