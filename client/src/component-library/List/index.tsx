import React from 'react'
import { useTodoContext } from '../../hooks/useTodoContext';
import { Card, CardDescription, CardHeader, ListWrapper } from './styled'

export const List = ({ data }: any) => {
  const { deleteTask } = useTodoContext();
  return (
    <ListWrapper>
        {data.map((item: any) => {
            return (
                <Card key={item._id}>
                  <div style={{ lineHeight: '18px'}}>
                    <CardHeader>
                      {item.title}
                    </CardHeader>
                    <span style={{ opacity: '.8', backgroundColor: 'blue', borderRadius: '2rem', padding: '1px', paddingLeft: '8px', paddingRight: '8px', fontSize: '12px', marginLeft: '12px'}} onClick={() => deleteTask(item._id)}>Delete</span>
                  </div>
                  
                  <CardDescription>{item.description}</CardDescription>
                </Card>
            )
        })}
    </ListWrapper>
  )
}