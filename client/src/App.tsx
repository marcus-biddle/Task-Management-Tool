import { useEffect, useState } from 'react';
import { addTodo, getTodos } from './api';
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
  }

  useEffect(() => {
    fetchTodos();
    console.log(todos);
  }, []);

  return (
    <div >
      <button onClick={handleClick}>Add task</button>
    </div>
  );
}

export default App;
