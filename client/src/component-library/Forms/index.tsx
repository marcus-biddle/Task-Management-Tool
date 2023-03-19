import styled from "styled-components";
import { colors } from "../../constants/colors";

export interface InputProps {
    dateInput?: Boolean;
}

export const StyledForm = styled.form`
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 4rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: thick double rgba(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.3);
`;

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 1129px) {
        display: flex;
        flex-direction: column;
    }
`;

export const InputContainer = styled.div`
    display: grid;
`;

export const Input = styled.input<InputProps>`
    padding-left: .277rem;
    padding-top: 2px;
    width: ${props => props.dateInput ? '' : '25rem'};

    @media (max-width: 1129px) {
        width: 100%;
    }
`;

export const Label = styled.label`
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.15px;
`;

export const Error = styled.div`
    height: 20px;
    font-size: 15px;
    font-weight: bolder;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${colors.ALERT};
    display: flex;
    justify-content: space-evenly;
`;

export const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: 1rem;
`;