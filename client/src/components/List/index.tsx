import React, { useState } from 'react'
import { checkIfTrue, useDate } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import { OptionsButton } from '../../component-library/Buttons';
import Show from '../../component-library/Functional/Show';
import { Card, CardDescription, CardHeader, DueDate, ListWrapper } from './styled';
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
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <CardHeader completed={item.completed} onClick={() => isOpen(!open)}>
          {item.title}
        </CardHeader>
{/* Fix colors styled components */}
        <Show when={editMode ? false : open}>
          <div style={{ display: 'flex'}}>
            <OptionsButton option='delete' onClick={() => deleteTask(item._id)}>Delete</OptionsButton>

            <Show when={!item.completed}>
                <OptionsButton option='edit' onClick={handleEdit}>Edit</OptionsButton>
            </Show>
            
            <OptionsButton option='complete' onClick={handleComplete}>{item.completed ? 'Undo' : 'Complete'}</OptionsButton>
          </div>
        </Show>

        <Show when={!open && !item.completed}>
          <DueDate>{useDate(item.date)}</DueDate>
        </Show>
      </div>
      
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