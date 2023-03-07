import React from 'react'
import { Card, CardDescription, CardHeader, ListWrapper } from './styled'

export const List = ({ data }: any) => {
  return (
    <ListWrapper>
        {data.map((item: any) => {
            return (
                <Card key={item._id}>
                  <CardHeader>{item.title}</CardHeader>
                  <CardDescription>{item.description}</CardDescription>
                </Card>
            )
        })}
    </ListWrapper>
  )
}