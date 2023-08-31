import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

interface ModalProps {
    showModal: Dispatch<SetStateAction<boolean>>;
}

// TODO: Style modal
const AddTaskModal = ({ showModal }: ModalProps) => {
  return (
    <div className='modal-background'>
        <div className='modal-container'>
            <button onClick={() => showModal(false)}>X</button>
            <p>test</p>
            <button onClick={() => showModal(false)}>Cancel</button>
            <button>Add</button>
        </div>
    </div>
  )
}

export default AddTaskModal