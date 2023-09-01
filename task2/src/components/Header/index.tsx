import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className='header-container'>
        <div className='logo'>Project</div>
        <nav>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/task-board'}>Task Board</Link></li>
                <li><Link to={'/goals'}>Goals</Link></li>
                <li><Link to={'/resume'}>Resume</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header