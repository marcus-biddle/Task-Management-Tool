import React from 'react'
import { getDate } from '../../helpers/conditionals'

export const Header = () => {
    
    return (
        <div style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'space-around', paddingTop: '.5rem', paddingBottom: '.5rem'}}>
            <div>React Task Manager</div>
            <div>{getDate()}</div>
        </div>
    )
}