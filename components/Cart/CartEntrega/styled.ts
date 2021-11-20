import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`

    & > div {
        display: flex;
        justify-content: flex-end;

        & > h2 {
           color: ${PINK};
        }

        & > span {
            color: ${PURPLE};
            font-weight: bold;
            padding-left: 5px;
        }
    }
`;

export default Wrapper;