import { ReactNode, FC, useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../../api';
import { DataType } from '../../components/Form';
import { TodoContext } from './context';

export interface TodoProviderProps {
    children: ReactNode
}



export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        getTodos()
            .then(({ data: { todos }}) => {
                setData(todos)})
            .catch((err) => console.log(err));
        console.log(data)
    }, [getTodos]);

    const updateTask = (form: any) => {
        updateTodo(form)
            .then(({ data }: any) => {
                setData(data.todos);
            })
    }
    
    const deleteTask = (_id: number) => {
        deleteTodo(_id)
            .then(({ data }: any) => {
                setData(data.todos);
            })
    }

    const addTask = (form: DataType) => {
        console.log('adding task...')
        addTodo(form)
            .then(({ status, data }) => {
                if (status !== 200) {
                console.log("Failed to add");
                };
                console.log('added task.')
                setData(data.todos);
            })
        
    }

    const value =  {
        tasks: data,
        deleteTask,
        addTask,
        updateTask
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}