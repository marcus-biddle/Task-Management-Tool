import styled from "styled-components";
import { colors } from "../../constants/colors";

export interface ButtonProps {
    editMode?: Boolean;
    option?: 'edit' | 'delete' | 'complete'
}

export const OptionsButton = styled.div<ButtonProps>`
    background-color: ${props => props.option === 'edit' ? colors.EDIT : props.option === 'complete' ? colors.COMPLETE : colors.DELETE };
    text-transform: uppercase;
    color: black;
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
    padding: 3px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
        opacity: .85;
    }
`;

export const SubmitButton = styled.button<ButtonProps>`
    width: 100%;
    height: 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: white;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.editMode ? 'rgba(86, 205, 113, 0.76)' : 'rgba(86, 190, 205)'};
    };

    @media (max-width: 1129px) {
        background-color: ${props => props.editMode ? colors.EDIT : colors.COMPLETE};
    }
`;