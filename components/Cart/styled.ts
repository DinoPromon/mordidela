import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`

    & > h2 {
        text-align: center;
        color: ${PURPLE};
    }
    
    & > div:last-child {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }
`;

export default Wrapper;