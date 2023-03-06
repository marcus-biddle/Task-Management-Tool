import React, { useState } from 'react'

export const SubmitTaskForm = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
      });

      const handleChange = (event: any) => {
        setForm({
          ...form,
          [event.target.id]: event.target.value,
        });
        console.log(form);
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('submit', form);
    
        setForm({
          title: '',
          description: '',
        });
      };
      
  return (
    <form onSubmit={handleSubmit}>
        <label>
          Title: <br />
          <input id='title' type='text' value={form.title} onChange={handleChange}/>
        </label>
        <br />
        <label>
          description: <br />
          <input id='description' type='text' value={form.description} onChange={handleChange}/>
        </label>
        <br />
        <label>
          Add deadline?
        </label>
        <button type='submit'>Submit</button>
      </form>
  )
}