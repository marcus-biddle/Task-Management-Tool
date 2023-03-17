import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../../component-library/Buttons';
import { ButtonWrapper, Error, Input, InputContainer, InputWrapper, Label, StyledForm } from '../../component-library/Forms';
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
    description: { required: "Description is required" },
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
// TODO: move errors into own row
  return (
    <StyledForm onSubmit={handleSubmit((data) => handleSubmission(data))}>
      <InputWrapper>
        <InputContainer>
          <Label>Title:</Label>
          <Input placeholder='Add a title' {...register('title', formOptions.title)} />
          <Error>
          <>
            { errors?.title && errors.title?.message }
          </>
          </Error>
          
        </InputContainer>
        <InputContainer>
          <Label>Description:</Label>
          <Input placeholder='Add a description' {...register('description', formOptions.description)} />
          <Error>
            <>
              { errors?.description && errors.description?.message }
            </>
          </Error>
        </InputContainer>
        <InputContainer>
          <Label>Due by:</Label>
          <Input dateInput={true} placeholder='MM/DD/YYYY' {...register('date', formOptions.date)} />
          <Error>
            <>
              { errors?.date && errors.date?.message }
            </>
          </Error>
        </InputContainer>
      </InputWrapper>
      
      <ButtonWrapper>
        <SubmitButton type="submit">Submit</SubmitButton>
      </ButtonWrapper>
      
    </StyledForm>
  );
}