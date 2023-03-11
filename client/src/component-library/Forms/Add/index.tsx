import React, { useState } from 'react'
import { useTodoContext } from '../../../hooks/useTodoContext';
import { SubmitButton } from '../../Buttons';
import { StyledForm, StyledInput, StyledLabel } from './styled';

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
      <div>
        <StyledLabel>
            Title:
        </StyledLabel>
        <StyledInput id='title' type='text' value={form.title} onChange={handleChange}/>
      </div>
      <div>
      <StyledLabel>
          description:
      </StyledLabel>
      <StyledInput id='description' type='text' value={form.description} onChange={handleChange}/>
      </div>
      <div>
      <StyledLabel>
          End Date:
          {/* We could put in props for sizing */}
      </StyledLabel>
      <StyledInput id='description' type='text' value={form.description} onChange={handleChange}/>
      </div>
        
        
        {/* <StyledLabel>
          // Change to end date
          Add deadline?
        </StyledLabel> */}
        <SubmitButton type='submit'>Submit</SubmitButton>
      </StyledForm>
  )
}