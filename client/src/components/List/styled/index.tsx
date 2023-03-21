import styled from "styled-components";
import { colors } from "../../../constants/colors";

interface CardProps {
    completed: boolean;
  }

export const ListWrapper = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 565px) {
        flex-direction: column;
    };
`;

export const CardTitle = styled.div<CardProps>`
    width: 78%;
    cursor: pointer;
    text-transform: uppercase;
    font-family: 'Bebas Neue', cursive;
    font-size: 1.677rem
    letter-spacing: 1.755px;
    padding-left: 1rem;
    padding-top: .333rem;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

export const CardDescription = styled.p`
    text-indent: 2rem;
    line-height: 1.5rem;
    padding-left: 6px;
    padding-right: 6px;
    text-transform: capitalize;
    opacity: .85;
    font-size: 15px;
    &::before {
        font-family: cursive;
        color: ${colors.ALERT};
        content: "Description: ";
        font-size: 20px;
    }
`;

export const Card = styled.div<CardProps>`
    margin-bottom: .455rem;
    background-color: rgba(0, 0, 0, 0.822);
    color: white;
    border: solid black;
    opacity: ${props => props.completed ? '.75' : '1'};
`;

export const DueDate = styled.div`
    padding-top: .6rem;
    padding-right: 1rem;
    &::before {
        color: grey;
        content: "Finish by: ";
        padding-right: 5px;
    };

    @media (max-width: 1129px) {
        display: flex;
        justify-content: end;
    }
`;

export const CardOptions = styled.div`
    display: flex;
    padding-top: 5px;
    justify-content: center;
`