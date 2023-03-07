import { createContext } from 'react'

const TodoContext = createContext<any>([]);

const { Consumer: TodoConsumer } = TodoContext;

export { TodoConsumer, TodoContext}