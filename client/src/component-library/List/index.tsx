import React, { useState } from 'react'
import { getDate } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import { OptionsButton } from '../Buttons';
import Show from '../Functional/Show';
import { Card, CardDescription, CardHeader, DueDate, ListWrapper } from './styled'

export const Item = ({ item }: any) => {
  const { deleteTask, updateTodo } = useTodoContext();
  const [open, isOpen] = useState(false);

  return (
    <Card onClick={() => isOpen(!open)}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <CardHeader>
          {item.title}
        </CardHeader>
        <Show when={open}>
        <div style={{ display: 'flex'}}>
        <OptionsButton color="red" onClick={() => deleteTask(item._id)}>Delete</OptionsButton>
        {/* For handleEdit we'll just want to update status to be true */}
        <OptionsButton onClick={() => updateTodo(item)}>Edit</OptionsButton>
        <OptionsButton color='blue' onClick={() => deleteTask(item._id)}>Completed</OptionsButton>
        </div>
        </Show>
        <Show when={!open}>
          <DueDate>{getDate(item.limit)}</DueDate>
        </Show>
      </div>
      <Show when={open}>
        <CardDescription>{item.description}</CardDescription>
      </Show>
    </Card>
  )
}
export const List = ({ data }: any) => {
  return (
    <ListWrapper >
        {data.map((item: any) => {
            return (
                <Item key={item._id} item={item} />
            )
        })}
    </ListWrapper>
  )
}