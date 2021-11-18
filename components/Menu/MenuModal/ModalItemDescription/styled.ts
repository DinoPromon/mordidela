import { PURPLE } from "@utils/colors";
import { PINK } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.form`

    & > h2 {
        font-size: 20px;
        text-transform: uppercase;
        text-align: center;
        /* color: #3b3b3b; */
        color: ${PURPLE};
    }

    & > div {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    & > p {
        color: #3b3b3b;
    }

    & > h3 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        color: ${PURPLE};
    }

    & > textarea {
        background-color: white;
        width: 100%;
        padding: 5px;
        text-align: center;
        margin-top: 1rem;
        border-radius: 0.25rem;
        border: 1px ${PURPLE} solid;
        outline: none;
        resize: none;
    }

    & > div:last-child {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        align-items: center;
    }
`;

export default Wrapper;