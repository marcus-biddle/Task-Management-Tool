import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from './api';
import './App.css';
import { List } from './component-library/List';
import { Header } from './components/Header';
import { SubmissionForm } from './components/Submisison';
import { useTodoContext } from './hooks/useTodoContext';

function App() {
  const { tasks, deleteTask, addTask } = useTodoContext();


  return (
    <div style={{ backgroundColor: 'grey', height: '100vh'}}>
      {/* Store a cookie if user has been here before */}
      <Header />
      <div>Keep track of your tasks below</div>
      {/* We can probably implement dark mode in this */}
      <SubmissionForm />

      {/* wrap this up */}
      <List data={tasks} />
      {tasks.map((item: any) => {
        return (
          <div key={item._id}>{item.title} {item._id}
          <button onClick={() => deleteTask(item._id)}>Delete</button></div>
        )
      })}
    </div>
  );
}

export default App;
