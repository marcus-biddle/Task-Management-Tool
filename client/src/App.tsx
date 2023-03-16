import './App.css';
import { List } from './components/List';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { showIfOrElse } from './helpers/conditionals';
import { getEditableTask } from './helpers/tasks';
import { useTodoContext } from './hooks/useTodoContext';

function App() {
  const { tasks } = useTodoContext();
  const changeTask = getEditableTask(tasks)


  return (
    <div style={{ backgroundColor: 'grey', height: '100vh'}}>
      <Header />
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

      <Form isEditing={changeTask}/>
      <List data={tasks} />
    </div>
  );
}

export default App;
