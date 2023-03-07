import { ReactNode, FC, useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from '../../api';
import { TodoContext } from './context';

export interface TodoProviderProps {
    children: ReactNode
}



export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
    const [data, setData] = useState<any[]>([]);
    // const [state, dispatch] = useReducer(todoReducer, )

    useEffect(() => {
        getTodos()
            .then(({ data: { todos }}) => {
                setData(todos)})
            .catch((err) => console.log(err));
    }, [getTodos]);
    
    const deleteTask = (_id: number) => {
        deleteTodo(_id)
            .then(({ data }: any) => {
                setData(data.todos);
            })
    }

    const addTask = (form: any) => {
        addTodo(form)
            .then(({ status, data }) => {
                if (status !== 200) {
                console.log("Failed to add");
                };
                setData(data.todos);
            })
    }

    const value =  {
        tasks: data,
        deleteTask,
        addTask
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}