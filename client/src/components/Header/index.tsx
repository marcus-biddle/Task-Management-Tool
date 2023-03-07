import React from 'react'

export const Header = () => {
    const currentDay = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const currentDayNum = new Date().toLocaleString('en-us', { dateStyle: 'long'});
    return (
        // Left side title of app, middle time, right could be user and links
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <div>React Task Manager</div>
            <div>{currentDay} {currentDayNum}</div>
        </div>
    )
}