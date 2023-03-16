import { useForm } from 'react-hook-form';
import { dateRegex } from '../../constants/types';
import { getEditableTask } from '../../helpers/tasks';
import { useTodoContext } from '../../hooks/useTodoContext';

export interface DataType {
  title: String;
  description: String;
  completed: Boolean;
  date: String;
  editing: Boolean;
  _id?: String;
}

export const Form = ({ isEditing }: any) => {
  const { tasks, updateTask, addTask } = useTodoContext();
  console.log(tasks);
    const changeTask = getEditableTask(tasks);

    //clear values?
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
    const addData: DataType = {...data, completed: false, editing: false};
    const editData: DataType = {...data, completed: false, editing: false, _id: changeTask._id}
    console.log(editData)
    // check if task is true then instead of addtask just edit task
    changeTask ? updateTask(editData) : addTask(addData);
  }
// we can use ternaries to check if there is a task with status true then put 
// those values as placeholders 
  return (
    <form onSubmit={handleSubmit((data) => handleSubmission(data))}>
        <label>Title</label>
      <input defaultValue={changeTask ? changeTask.title : ' y'} {...register('title', formOptions.title)} />
      <>
        { errors?.title && errors.title?.message }
      </>
      <label>Description</label>
      <input defaultValue={changeTask ? changeTask.description : ' '} placeholder='description' {...register('description', formOptions.description)} />
      <label>Due by:</label>
      {/* Need to fix limit => date in server, and to format date */}
      <input defaultValue={changeTask ? changeTask.limit : ' '} placeholder='date' {...register('date', formOptions.date)} />
      <>
        { errors?.date && errors.date?.message }
      </>
      <input type="submit" />
    </form>
  );
}