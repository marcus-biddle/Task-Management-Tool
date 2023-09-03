import React, { Dispatch, SetStateAction, useState } from 'react';
import './style.css';

interface ModalProps {
    showModal: Dispatch<SetStateAction<boolean>>;
    onSubmit: (taskText: string) => void;
}

export const AddGoalModal = ({ showModal, onSubmit }: ModalProps) => {
    const [text, setText] = useState('');
    // const [email, setEmail] = useState('');

    const handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
      };
    
    //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    //   };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can process the form data here, e.g., send it to a server
        onSubmit(text);
        showModal(false);
        // console.log('Email:', email);
      };

  return (
    <div className='goal-modal-background'>
        <div className='modal-container'>
            <button onClick={() => showModal(false)} className='titleCloseBtn'>X</button>
            <form onSubmit={handleSubmit}>
                <div className='text-input-container'>
                    <label>What are you trying to accomplish?</label>
                    <input
                        type="text"
                        value={text}
                        onChange={handletextChange}
                        required
                    />
                </div>
                {/* <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div> */}
                <div className='modal-btn-options'>
                    <button onClick={() => showModal(false)} id='cancel-btn'>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
        </form>
        
            
        </div>
    </div>
  )
}