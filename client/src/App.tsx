import './App.css';
import { checkEditMode } from './helpers/tasks';
import { useTodoContext } from './hooks/useTodoContext';
import { Form, Header, List, UserInfo } from './components';

function App() {
  const { tasks } = useTodoContext();
  const changeTask = checkEditMode(tasks)

  return (
    <div className='App'>
      <Header />
      <UserInfo editMode={changeTask} />
      <Form isEditing={changeTask}/>
      <List data={tasks} editMode={changeTask} />
    </div>
  );
}

export default App;
