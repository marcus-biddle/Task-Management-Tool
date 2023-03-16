import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DataType, dateRegex } from '../../constants/types';
import { useTodoContext } from '../../hooks/useTodoContext';

//TODO: styled components.

export const Form = ({ isEditing }: any) => {
  const { updateTask, addTask } = useTodoContext();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
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

  const customReset = () => {
    resetField('title');
    resetField('description');
    resetField('date');
  }

  const handleSubmission = (data: any) => {
    const addData: DataType = {...data, completed: false, editing: false};
    const editData: DataType = {...data, completed: false, editing: false, _id: isEditing._id}
    isEditing ? updateTask(editData) : addTask(addData);
    customReset();
    console.log(addData);
  }

  useEffect(() => {
    const customSetValue = () => {
      setValue('title', isEditing.title);
      setValue('description', isEditing.description);
      setValue('date', isEditing.date);
    }

    if (isEditing) {
      customSetValue();
    } else {

    }
  }, [isEditing, setValue])

  return (
    <form onSubmit={handleSubmit((data) => handleSubmission(data))}>
        <label>Title</label>
      <input placeholder='Add a title' {...register('title', formOptions.title)} />
      <>
        { errors?.title && errors.title?.message }
      </>
      <label>Description</label>
      <input placeholder='Add a description' {...register('description', formOptions.description)} />
      <label>Due by:</label>
      <input placeholder='MM/DD/YYYY' {...register('date', formOptions.date)} />
      <>
        { errors?.date && errors.date?.message }
      </>
      <input type="submit" />
    </form>
  );
}