import React from 'react'
import { getDate } from '../../helpers/conditionals'

export const Header = () => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <div>React Task Manager</div>
            <div>{getDate()}</div>
        </div>
    )
}