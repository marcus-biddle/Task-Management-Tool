import React, { useState } from 'react'
import { getDate } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import { OptionsButton } from '../Buttons';
import Show from '../Functional/Show';
import { Card, CardDescription, CardHeader, DueDate, ListWrapper } from './styled'

export const Item = ({ item }: any) => {
  const { deleteTask } = useTodoContext();
  const [open, isOpen] = useState(false);

  return (
    <Card key={item._id} onClick={() => isOpen(!open)}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <CardHeader>
          {item.title}
        </CardHeader>
        <Show when={open}>
        <div style={{ display: 'flex'}}>
        <OptionsButton color="red" onClick={() => deleteTask(item._id)}>Delete</OptionsButton>
        <OptionsButton onClick={() => deleteTask(item._id)}>Edit</OptionsButton>
        </div>
        </Show>
        <Show when={!open}>
          <DueDate>{getDate(' ')}</DueDate>
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
                <Item item={item} />
            )
        })}
    </ListWrapper>
  )
}