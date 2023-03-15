import { useForm } from 'react-hook-form';

export const Form = ({ isEditing }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  }

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