import React, { useState } from 'react'
import { getDate } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import { OptionsButton } from '../../component-library/Buttons';
import Show from '../../component-library/Functional/Show';
import { Card, CardDescription, CardHeader, DueDate, ListWrapper } from './styled';

export const Item = ({ item }: any) => {
  const { deleteTask, updateTask } = useTodoContext();
  const [open, isOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleEdit = () => {
    const data = {...item, editing: true};
    updateTask(data);
  }

  const handleComplete = () => {
    const data = {...item, completed: !completed};
    updateTask(data);
    console.log('completed', data);
    setCompleted(!completed);
  }

  return (
    <Card completed={item.completed} onClick={() => isOpen(!open)}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <CardHeader>
          {item.title}
        </CardHeader>

        <Show when={open}>
          <div style={{ display: 'flex'}}>
            <OptionsButton color="red" onClick={() => deleteTask(item._id)}>Delete</OptionsButton>
            
            <Show when={!item.completed}>
              <OptionsButton onClick={handleEdit}>Edit</OptionsButton>
            </Show>
            
            <OptionsButton color='blue' onClick={handleComplete}>Completed</OptionsButton>
          </div>
        </Show>

        <Show when={!open && !item.completed}>
          <DueDate>{getDate(item.date)}</DueDate>
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