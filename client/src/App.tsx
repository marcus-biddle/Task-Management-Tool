import './App.css';
import { checkEditMode } from './helpers/tasks';
import { useTodoContext } from './hooks/useTodoContext';
import { Form, Header, List, UserInfo } from './components';

function App() {
  // This should be a home page 
  const { tasks } = useTodoContext();
  const changeTask = checkEditMode(tasks)

  return (
    <div>
      {/* <Header />
      <UserInfo editMode={changeTask} />
      <Form isEditing={changeTask}/>
      <List data={tasks} editMode={changeTask} /> */}
      App
    </div>
  );
}

export default App;
