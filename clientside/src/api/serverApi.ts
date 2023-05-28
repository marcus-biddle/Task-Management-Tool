import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://mongodb-server-6t4m.onrender.com/api';

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

export const addServer = async (
  formData: any
): Promise<AxiosResponse<any>> => {
  try {
    const server = {
      title: formData.title,
      tasks: formData.tasks,
      description: formData.description,
      createdBy: formData.createdBy,
      active: formData.active,
    };

    const saveServer = await axios.post(baseUrl + '/add-server', server);

    return saveServer;
  } catch (err) {
    throw err;
  }
};

export const updateServer = async (
  server: any
): Promise<AxiosResponse<any>> => {
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
