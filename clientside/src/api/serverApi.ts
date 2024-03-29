import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://mongodb-server-6t4m.onrender.com/api';

export interface Server {
  _id?: string;
  title: string;
  createdBy?: string;
  active?: boolean; //Instead of deleting, can soft delete
}

export const getServers = async (): Promise<AxiosResponse<any>> => {
  try {
    const servers: AxiosResponse<any> = await axios.get(
      baseUrl + '/servers'
    );
    return servers;
  } catch (err) {
    throw err;
  }
};

export const addServer = async (formData: any): Promise<AxiosResponse<any>> => {
  try {
    const server = {
      title: formData.title,
      createdBy: formData.createdBy,
      active: formData.active,
    };

    const saveServer = await axios.post(baseUrl + '/add-server', server);

    return saveServer;
  } catch (err) {
    throw err;
  }
};

export const updateServer = async (server: any): Promise<AxiosResponse<any>> => {
  try {
    const updatedServer = await axios.put(
      baseUrl + '/edit-server/' + server._id,
      server
    );

    return updatedServer;
  } catch (err) {
    throw err;
  }
};

export const deleteServer = async (
  _id: any
): Promise<AxiosResponse<any>> => {
  try {
    const deleteServer = await axios.delete(`${baseUrl}/delete-server/${_id}`);
    return deleteServer;
  } catch (err) {
    throw err;
  }
};

export const getServer = async (id: string): Promise<AxiosResponse<any>> => {
    try {
      console.log(id);
      const server: AxiosResponse<any> = await axios.get(`${baseUrl}/servers/${id}`);
      return server;
    } catch (err) {
      throw err;
    }
  };