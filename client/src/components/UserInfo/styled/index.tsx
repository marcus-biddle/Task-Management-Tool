import styled from "styled-components";
import { colors } from "../../../constants/colors";

export interface ModeProps {
    editMode: Boolean
}

export const InfoWrapper = styled.div`
    color: black;
    font-weight: bold;
    text-align: center;
    font-size: 32px;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const TaskMessage = styled.span<ModeProps>`
    text-decoration-line: underline;
    text-underline-offset: 8px;
    text-decoration-color: ${props => props.editMode ? colors.EDIT : colors.COMPLETE};
    text-transform: capitalize;
`;