import { useForm } from 'react-hook-form';
import { dateRegex } from '../../constants/types';
import { getEditableTask } from '../../helpers/tasks';
import { useTodoContext } from '../../hooks/useTodoContext';

export const Form = ({ isEditing }: any) => {
  const { tasks, editTodo, addTodo } = useTodoContext();
  console.log(tasks);
    const changeTask = getEditableTask(tasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formOptions = {
    title: { required: "Title is required" },
    description: { required: false },
    date: { required: "Date is required", pattern: {
        value: dateRegex,
        message: "Format date as MM/DD/YYYY"
    }},
  }

  const handleSubmission = (data: any) => {
    // Change these once db is updated to reflect modal attributes.
    const addData = {...data, completed: false, status: false, editing: false};
    const editData = {...data, completed: false, status: false, editing: false}
    console.log(addData)
    // check if task is true then instead of addtask just edit task
    changeTask ? editTodo(editData) : addTodo(addData);
  }
// we can use ternaries to check if there is a task with status true then put 
// those values as placeholders 
  return (
    <form onSubmit={handleSubmit((data) => handleSubmission(data))}>
        <label>Title</label>
      <input defaultValue={changeTask ? changeTask.title : ''} {...register('title', formOptions.title)} />
      <>
        { errors?.title && errors.title?.message }
      </>
      <label>Description</label>
      <input defaultValue={changeTask ? changeTask.description : ''} placeholder='description' {...register('description', formOptions.description)} />
      <label>Due by:</label>
      {/* Need to fix limit => date in server, and to format date */}
      <input defaultValue={changeTask ? changeTask.limit : ''} placeholder='date' {...register('date', formOptions.date)} />
      <>
        { errors?.date && errors.date?.message }
      </>
      <input type="submit" />
    </form>
  );
}