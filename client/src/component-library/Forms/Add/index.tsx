import React, { useState } from 'react'
import { useTodoContext } from '../../../hooks/useTodoContext';
import { StyledForm, StyledLabel } from './styled';

export const SubmitTaskForm = () => {
    const { addTask } = useTodoContext();
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: false,
        limit: 'null'
      });

      const handleChange = (event: any) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        addTask(form);
    
        setForm({
          title: '',
          description: '',
          status: false,
          limit: 'null'
        });
      };

      // Need to create validators to pervent hacking.
  return (
    <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Title:
        </StyledLabel>
        <input id='title' type='text' value={form.title} onChange={handleChange}/>
        <StyledLabel>
          description:
        </StyledLabel>
        <input id='description' type='text' value={form.description} onChange={handleChange}/>
        {/* <StyledLabel>
          // Change to end date
          Add deadline?
        </StyledLabel> */}
        <button type='submit'>Submit</button>
      </StyledForm>
  )
}