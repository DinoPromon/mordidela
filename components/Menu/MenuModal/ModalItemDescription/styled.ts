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
`;

export default Wrapper;