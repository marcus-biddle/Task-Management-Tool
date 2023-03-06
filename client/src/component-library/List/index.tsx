import React from 'react'

export const List = ({ data }: any) => {
    // basic list style
  return (
    <div>
        {data.map((item: any) => {
            return (
                // List bullets?
                <div>{item.title}</div>
            )
        })}
    </div>
  )
}