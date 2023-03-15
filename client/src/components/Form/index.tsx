import { useForm } from 'react-hook-form';

export const Form = ({ isEditing }: any) => {
    // create hook for below
    const task = getEditableTask();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
// change server modal to be title, description, date, completed, editing
  const formOptions = {
    title: { required: "Title is required" },
    description: { required: false },
    date: { required: "Date is required", pattern: {
        value: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,
        message: "Format date as MM/DD/YYYY"
    }},
  }

  const handleSubmission = (data: any) => {
    const formatData = {...data, completed: false, status: false};
    console.log(formatData)
    // check if task is true then instead of addtask just edit task
  }
// we can use ternaries to check if there is a task with status true then put 
// those values as placeholders 
  return (
    <form onSubmit={handleSubmit((data) => handleSubmission(data))}>
        <label>Title</label>
      <input {...register('title', formOptions.title)} />
      <>
        { errors?.title && errors.title?.message }
      </>
      <label>Description</label>
      <input {...register('description', formOptions.description)} />
      <label>Due by:</label>
      <input {...register('date', formOptions.date)} />
      <>
        {errors?.date && errors.date?.message}
      </>
      <input type="submit" />
    </form>
  );
}