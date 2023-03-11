import style from 'styled-components';

export const StyledLabel = style.label`
    text-transform: uppercase;
    padding: 10px;
`;

export const StyledForm = style.form`
    background-color: rgba(0, 0, 0, 0.822);
    font-family: 'Bebas Neue', cursive;
    letter-spacing: 1px;
    font-size: 24px;
    border: solid black;
    color: orange;
    display: flex;
    justify-content: space-evenly;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 3rem;
`;

export const StyledInput = style.input`
    height: 1.333rem;
    padding-top: .4rem;
`;