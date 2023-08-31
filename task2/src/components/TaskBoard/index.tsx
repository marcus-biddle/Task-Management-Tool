import React, { useState } from 'react'
import './style.css';
import AddTaskModal from '../Modal/addTask';

const TABLE = [
    { id: 1, text: 'Test', completed: false},
    { id: 2, text: 'Test2', completed: true},
    { id: 3, text: 'Test3', completed: false},
]

const TaskBoard = () => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
        {openModal && <AddTaskModal showModal={setOpenModal}/>}
        <div className='tb-container'>
            <h2>Task Board</h2>
            <div className='tb-options'>
                <button onClick={() => setOpenModal(true)}>Add</button>
                <button>Delete</button>
            </div>
        
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {TABLE.map(task => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.text}</td>
                                <td>{task.completed ? 'true' : 'false'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    
  )
}

export default TaskBoard