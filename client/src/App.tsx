import './App.css';
import { List } from './components/List';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { showIfOrElse } from './helpers/conditionals';
import { checkEditMode } from './helpers/tasks';
import { useTodoContext } from './hooks/useTodoContext';

function App() {
  const { tasks } = useTodoContext();
  const changeTask = checkEditMode(tasks)

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '100vh'}}>
      <Header />
      {/* TODO: Clean this up */}
      {showIfOrElse(changeTask)(
        // change styling to make it stick out.
        <div style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '32px', marginTop: '2rem', marginBottom: '2rem'}}>
          Edit "<span style={{ textDecorationLine: 'underline', textUnderlineOffset: '8px', textDecorationColor: 'rgba(86, 205, 113)', textTransform: 'capitalize' }}>{changeTask.title}</span>" Task Below
        </div>
      )(
        <div style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '32px', marginTop: '2rem', marginBottom: '2rem'}}>
          Add A <span style={{ textDecorationLine: 'underline', textUnderlineOffset: '8px', textDecorationColor: 'rgba(86, 190, 205)' }}>Task</span> Below
        </div>
      )}

      <Form isEditing={changeTask}/>
      <List data={tasks} editMode={changeTask} />
    </div>
  );
}

export default App;
