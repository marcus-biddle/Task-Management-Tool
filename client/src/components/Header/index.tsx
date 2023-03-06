import React from 'react'

export const Header = () => {
    const currentDay = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const currentDayNum = new Date().toLocaleString();
    return (
        // Left side title of app, middle time, right could be user and links
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <div> Welcome back, User</div>
            <div>today is {currentDay} {currentDayNum}</div>
        </div>
    )
}