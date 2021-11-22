import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-top: 3rem;

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: center;

        & > h2 {
           color: ${PINK};
           justify-content: center;
           font-size: 20px;
        }

        & > span {
            color: ${PURPLE};
            font-weight: bold;
            padding-left: 5px;
            font-size: 20px;
        }
    }
`;

export default Wrapper;