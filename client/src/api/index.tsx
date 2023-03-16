import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://mongodb-server-6t4m.onrender.com/api/v1';

export const getTodos = async (): Promise<AxiosResponse<any>> => {
    try {
        const todos: AxiosResponse<any> = await axios.get(
            baseUrl + "/todos"
        );
        return todos;
    } catch (err) {
        throw err;
    }
};

export const addTodo = async (formData: any): Promise<AxiosResponse<any>> => {
    try {
        const todo = {
            title: formData.title,
            description: formData.description,
            completed: false,
            date: formData.date,
            editing: false,
        };

        const saveTodo = await axios.post(baseUrl + '/add-todo', todo);

        return saveTodo
    } catch (err) {
        throw err;
    }
};

// will need to change this to include editing the description
export const updateTodo = async (todo: any): Promise<AxiosResponse<any>> => {
    try {
        // const todoUpdate = { status: true }

        const updatedTodo = await axios.put(baseUrl + '/edit-todo/' + todo._id, todo);
        console.log(todo._id);

        return updatedTodo;
    } catch (err) {
        throw err;
    }
};

export const deleteTodo = async (_id: any): Promise<AxiosResponse<any>> => {
    try {
        const deleteTodo = await axios.delete(`${baseUrl}/delete-todo/${_id}`);
        return deleteTodo;
    } catch (err) {
        throw err;
    }
};