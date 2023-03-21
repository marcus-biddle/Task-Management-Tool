import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SubmitButton } from '../../component-library/Buttons';
import { ErrorMessage } from '../../component-library/Error';
import { ButtonWrapper, Input, InputContainer, InputWrapper, Label, StyledForm } from '../../component-library/Forms';
import Show from '../../component-library/Functional/Show';
import { DataType, dateRegex, textRegex } from '../../constants/types';
import { checkIfTrue } from '../../helpers/conditionals';
import { useTodoContext } from '../../hooks/useTodoContext';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

export const Form = ({ isEditing }: any) => {
  const { updateTask, addTask } = useTodoContext();
  const [cancelled, isCancelled] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const formOptions = {
    title: { required: "Title is required", pattern: {
      value: textRegex,
      message: "Letters and Numbers only"
    } },
    description: { required: "Description is required", pattern: {
      value: textRegex,
      message: "Letters and Numbers only"
    } },
    date: { required: "Date is required", pattern: {
        value: dateRegex,
        message: "Format MM/DD/YYYY"
    }},
  }

  const customReset = () => {
    resetField('title');
    resetField('description');
    resetField('date');
  }

  const handleSubmission = (data: DataType) => {
    console.log('Submit')
    console.log(data);
    const addData: DataType = {...data, completed: false, editing: false};
    const editData: DataType = {...data, completed: false, editing: false, _id: isEditing._id};
    const cancelledData: DataType = {...isEditing, editing: false}; 
    cancelled 
    ? 
    updateTask(cancelledData) :
    isEditing ? updateTask(editData) : addTask(addData);
    customReset();
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
    <StyledForm onSubmit={handleSubmit((data: any) => handleSubmission(data))}>
      <InputWrapper>
        <InputContainer>
          <Label>Title:</Label>
          <Input placeholder='Add a title' {...register('title', formOptions.title)} />
          <ErrorMessage errors={errors?.title && errors.title?.message} />
        </InputContainer>
        <InputContainer>
          <Label>Description:</Label>
          <Input placeholder='Add a description' {...register('description', formOptions.description)} />
          <ErrorMessage errors={errors?.description && errors.description?.message} />
        </InputContainer>
        <InputContainer>
          <Label>Due by:</Label>
          <Controller
            control={control}
            name='date'
            render={({ field }: any) => (
              <DatePicker
                placeholderText='Select date'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                minDate={new Date()}
              />
            )}
            
          />
          <ErrorMessage errors={errors?.date && errors.date?.message} />
        </InputContainer>
      </InputWrapper>
      
      <ButtonWrapper>
        <SubmitButton editMode={checkIfTrue(isEditing)} type="submit">{isEditing ? 'Edit task' : 'Add task'}</SubmitButton>
        <Show when={checkIfTrue(isEditing)}>
        <SubmitButton color='red' editMode={checkIfTrue(isEditing)} onClick={() => isCancelled(true)}>Cancel</SubmitButton>
        </Show>
      </ButtonWrapper>
      
    </StyledForm>
  );
}