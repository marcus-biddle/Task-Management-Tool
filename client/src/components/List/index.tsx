import { useState } from 'react'
import { useDate } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import { OptionsButton } from '../../component-library/Buttons';
import Show from '../../component-library/Functional/Show';
import { Card, CardDescription, CardHeader, CardOptions, CardTitle, DueDate, ListWrapper } from './styled';
import { checkEditMode } from '../../helpers/tasks';

export const Item = ({ item }: any) => {
  const { tasks, deleteTask, updateTask } = useTodoContext();
  const [open, isOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const editMode = checkEditMode(tasks)

  const handleEdit = () => {
    const data = {...item, editing: true};
    updateTask(data);
  }

  const handleComplete = () => {
    const data = {...item, completed: !completed};
    updateTask(data);
    console.log('completed', data);
    setCompleted(!completed);
    isOpen(false);
  }

  return (
    <Card completed={item.completed} >
      <CardHeader>
        <CardTitle completed={item.completed} onClick={() => isOpen(!open)}>
          {item.title}
        </CardTitle>

        <Show when={editMode ? false : open}>
          <CardOptions>
            <OptionsButton option='delete' onClick={() => deleteTask(item._id)}>Delete</OptionsButton>

            <Show when={!item.completed}>
                <OptionsButton option='edit' onClick={handleEdit}>Edit</OptionsButton>
            </Show>
            
            <OptionsButton option='complete' onClick={handleComplete}>{item.completed ? 'Undo' : 'Complete'}</OptionsButton>
          </CardOptions>
        </Show>

        <Show when={!open && !item.completed}>
          <DueDate>{' '}{useDate(item.date)}</DueDate>
        </Show>
      </CardHeader>
      
      <Show when={open && !item.completed}>
        <CardDescription>{item.description}</CardDescription>
      </Show>
    </Card>
  )
}
export const List = ({ data }: any) => {
  return (
    <ListWrapper>
        {data.map((item: any) => {
            return (
                <Item key={item._id} item={item} />
            )
        })}
    </ListWrapper>
  )
}