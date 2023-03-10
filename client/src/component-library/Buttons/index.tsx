import styled from "styled-components";


export const OptionsButton = styled.div`
    background-color: ${props => props.color ? props.color : 'green'};
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
    padding: 3px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 25px;
`;

export const submitButton = styled.div`

`;