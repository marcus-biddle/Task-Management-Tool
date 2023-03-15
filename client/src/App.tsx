import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos } from './api';
import './App.css';
import { List } from './component-library/List';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { SubmissionForm } from './components/Submisison';
import { showIfOrElse } from './helpers/conditionals';
import { getEditableTask } from './helpers/tasks';
import { useTodoContext } from './hooks/useTodoContext';

function App() {
  const { tasks, deleteTask, addTask } = useTodoContext();
  // don't think I need this here
  const changeTask = getEditableTask(tasks)


  return (
    <div style={{ backgroundColor: 'grey', height: '100vh'}}>
      {/* Store a cookie if user has been here before */}
      <Header />
      {/* <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '24px', marginTop: '2rem', marginBottom: '2rem'}}>
        Add A <span style={{ textDecorationLine: 'underline', textDecorationStyle: 'wavy', textDecorationColor: '#ff7f0f8f' }}>Task</span> Below
      </div> */}
      {/* TODO: Clean this up */}
      {showIfOrElse(changeTask)(
        // change styling to make it stick out.
        <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '24px', marginTop: '2rem', marginBottom: '2rem'}}>
          Edit "<span style={{ textDecorationLine: 'underline', textDecorationStyle: 'wavy', textDecorationColor: '#ff7f0f8f' }}>{changeTask.title}</span>" Task Below
        </div>
      )(
        <div style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '24px', marginTop: '2rem', marginBottom: '2rem'}}>
          Add A <span style={{ textDecorationLine: 'underline', textDecorationStyle: 'wavy', textDecorationColor: '#ff7f0f8f' }}>Task</span> Below
        </div>
      )}
      {/* We can probably implement dark mode in this */}
      {/* <SubmissionForm /> */}
      <Form />
      {/* wrap this up */}
      <List data={tasks} />
      {/* {tasks.map((item: any) => {
        return (
          <div key={item._id}>{item.title} {item._id}
          <button onClick={() => deleteTask(item._id)}>Delete</button></div>
        )
      })} */}
    </div>
  );
}

export default App;
