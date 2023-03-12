import React, { useState } from 'react'
import { useTodoContext } from '../../../hooks/useTodoContext';
import { SubmitButton } from '../../Buttons';
import { StyledForm, StyledInput, StyledLabel } from './styled';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { showIfOrElse } from '../../../helpers/conditionals';

export const SubmitTaskForm = ({ isEditing }: any) => {
    const { addTask } = useTodoContext();
    const [startDate, setStartDate] = useState(new Date());
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

      const handleDate = (date: Date) => {
        // create hook for date
        setStartDate(date);
        setForm({
          ...form,
          limit: `${date.toISOString()}`,
        })
      }
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        addTask(form);
    
        setForm({
          title: '',
          description: '',
          status: false,
          limit: '',
        });
      };

      // Need to create validators to pervent hacking.
  return (
    <StyledForm onSubmit={handleSubmit}>
      <div style={{ paddingTop: '1.5px'}}>
        <div style={{  display: 'flex', lineHeight: '3px'}}>
          <StyledLabel>
              Title:
          </StyledLabel>
          <StyledInput id='title' type='text' value={form.title} onChange={handleChange}/>
        </div>
      </div>
      
      <div style={{ paddingTop: '3px'}}>
        <div style={{ display: 'flex', lineHeight: '3px'}}>
          <StyledLabel>
            description:
          </StyledLabel>
          <StyledInput id='description' type='text' value={form.description} onChange={handleChange}/>
        </div>
      </div>

      <div style={{ display: 'flex', lineHeight: '.5px'}}>
        <StyledLabel>
          Goal Date:
        </StyledLabel>
        <div style={{ marginTop: 'auto', marginBottom: 'auto', padding: '5px' }}>
          <DatePicker selected={startDate} onChange={(date: Date) => handleDate(date)} />
        </div>
      </div>
      <>
      {showIfOrElse(isEditing)
      (<SubmitButton type='submit'>Submit</SubmitButton>)
      (<SubmitButton type='submit'>Submit</SubmitButton>)}
        
      </>
      
      </StyledForm>
  )
}