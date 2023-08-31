import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

interface ModalProps {
    showDeleteModal: Dispatch<SetStateAction<boolean>>;
    onDelete: () => void;
}

// TODO: Style modal
export const DeleteTaskModal = ({ showDeleteModal, onDelete }: ModalProps) => {

    const handleSubmit = () => {
        onDelete();
        showDeleteModal(false);
        // console.log('Email:', email);
      };

  return (
    <div className='modal-background'>
        <div className='modal-container'>
            <button onClick={() => showDeleteModal(false)} className='titleCloseBtn'>X</button>
            <h1 className='title'>Delete Tasks?</h1>
            <p className='body'>Are you sure you want to delete all tasks that are completed?</p>
            <div className='modal-btn-options'>
                        <button onClick={() => showDeleteModal(false)} id='cancel-btn'>Cancel</button>
                        <button type="submit" onClick={handleSubmit}>Delete</button>
                    </div>
            </div>
    </div>
  )
}