import styled from "styled-components";

const Wrapper = styled.div`


    & > h2 {
        font-size: 20px;
        text-transform: uppercase;
        text-align: center;
        /* letter-spacing: 1px; */
    }

    & > div {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    & > h3 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    & > ul {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
        row-gap: 0.5rem;
    }

    /* fazer uma div pro li com dois spans
    colocar display: flex, justify-content: space-between
    um span é o texto e o outro o valor
     */
`;

export default Wrapper;