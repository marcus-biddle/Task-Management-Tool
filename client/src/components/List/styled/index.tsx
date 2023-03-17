import styled from "styled-components";

interface CardProps {
    completed: boolean;
  }

export const ListWrapper = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;
`;

export const CardHeader = styled.div<CardProps>`
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
        color: orange;
        content: "Description: ";
        font-size: 20px;
    }
`;

export const Card = styled.div<CardProps>`
    cursor: pointer;
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
    }
`;