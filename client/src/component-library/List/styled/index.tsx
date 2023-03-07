import styled from "styled-components";

export const ListWrapper = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;
    
`;

export const CardHeader = styled.div`
    text-transform: uppercase;
    font-family: 'Bebas Neue', cursive;
    font-size: 1.677rem
    letter-spacing: 1.755px;
    padding-left: 12px;
    padding-top: 16px;
`;

export const CardDescription = styled.p`
    text-indent: 2rem;
    line-height: 1.5rem;
    padding-left: 6px;
    padding-right: 6px;
    text-transform: capitalize;
    &::before {
        font-family: cursive;
        opacity: .5;
        color: orange;
        content: "Description: ";
    }
`;

export const Card = styled.div`
    background-color: rgba(0, 0, 0, 0.822);
    color: white;
    border: solid;
    line-height: .8rem;
`;