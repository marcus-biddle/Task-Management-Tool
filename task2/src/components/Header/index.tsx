import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className='header-container'>
        <div className='logo'>Task Management System</div>
        <nav>
            <ul>
                <li><Link to={'/task-board'}>Task Board</Link></li>
                <li><Link to={'/goals'}>Goals</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header