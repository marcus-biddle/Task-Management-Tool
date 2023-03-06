import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from './api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    getTodos()
      .then(({ data: { todos }}) => setTodos(todos))
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    addTodo({title: 'TitleTest', description: 'DescriptionTest', status: false, limit: 'IDK'})
      .then(({ status, data }) => {
        if (status !== 200) {
          console.log("Failed to add");
        }
        setTodos(data.todos);
      })

      console.log('Add', todos);
  }

  const handleDelete = (_id: any) => {
    deleteTodo(_id)
      .then(({ data }) => {
        setTodos(data.todos);
      });

      console.log('Delete', todos);
  }

  useEffect(() => {
    fetchTodos();
    console.log(todos);
  }, []);

  return (
    <div >
      <button onClick={handleClick}>Add task</button>
      {todos.map((item: any) => {
        return (
          <div>{item.title} {item._id}
          <button onClick={() => handleDelete(item._id)}>Delete</button></div>
        )
      })}
    </div>
  );
}

export default App;
