import styled from "styled-components";

export interface InputProps {
    dateInput?: Boolean;
}

export const StyledForm = styled.form`
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const InputContainer = styled.div`
    display: grid;
`;

export const Input = styled.input<InputProps>`
    padding-left: .277rem;
    padding-top: 2px;
    width: ${props => props.dateInput ? '' : '25rem'};
`;

export const Label = styled.label`
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.15px;
`;

export const Error = styled.div`
    font-size: 15px;
    font-weight: bolder;
    letter-spacing: 1.5px;
    text-transform: uppercase;
`;

export const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: 1rem;
`;