import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from './api';
import './App.css';
import { SubmitTaskForm } from './component-library/Forms/Add';
import { List } from './component-library/List';
import { Header } from './components/Header';

function App() {
  // make context for todos list
  const [todos, setTodos] = useState([]);
  
  

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
  
// Add categories to make filters. That would be a good addition.
  return (
    <div>
      {/* Store a cookie if user has been here before */}
      <Header />
      <div>What are your plans today?</div>
      {/* We can probably implement dark mode in this */}
      {/* Could make this a popup modal */}
      <SubmitTaskForm />
      
      <button onClick={handleClick}>Add task</button>
      {/* wrap this up */}
      <List data={todos} />
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
