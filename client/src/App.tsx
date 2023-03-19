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
      

      <Form isEditing={changeTask}/>
      <List data={tasks} editMode={changeTask} />
    </div>
  );
}

export default App;
