import React, { useState } from 'react'
import './style.css';
import AddTaskModal from '../Modal/addTask';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'
import { DeleteTaskModal } from '../Modal/deleteTask';

const TABLE = [
    { id: 1, text: 'Create a backend to store tasks.', completed: false},
    { id: 2, text: 'Create a home page', completed: true},
    { id: 3, text: 'Add Delete functionality', completed: false},
]

const TaskBoard = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [tasks, setTasks] = useState(TABLE);

    const handleStatusChange = (taskId: number) => {
        const updateTable = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        setTasks(updateTable);
    }

    const onSubmit = (taskText: string) => {
        const newTask = { id: tasks.length + 1, text: taskText, completed: false};
        const updateTable = [...tasks, newTask];
        setTasks(updateTable);
    }

    const handleDelete = () => {
        const updateTable = tasks.filter(task => {
            if (task.completed === false) {
                return task;
            }
            return;
        })

        setTasks(updateTable);
    }

  return (
    <div>
        {openModal && <AddTaskModal showModal={setOpenModal} onSubmit={onSubmit}/>}
        {openDeleteModal && <DeleteTaskModal showDeleteModal={setOpenDeleteModal} onDelete={handleDelete}/>}
        <div className='tb-container'>
            <h2>Task Board</h2>
            <div className='tb-options'>
                <button onClick={() => setOpenModal(true)}>Add</button>
                <button onClick={() => setOpenDeleteModal(true)}>Delete</button>
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
                    {tasks.map(task => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.text}</td>
                                <td>
                                    <button onClick={() => handleStatusChange(task.id)}>
                                    {openModal || openDeleteModal ? '' : task.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />  }
                                    </button>
                                </td>
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