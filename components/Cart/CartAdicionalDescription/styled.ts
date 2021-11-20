import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`

    & > div {
        display: flex;
        position: relative;

        & > p {
            font-size: 13px;
        }
    
        & > span {
            font-size: 13px;
            font-weight: bold;
            color: ${PURPLE};
            position: absolute;
            right: 0;
        }
    }
`;

export default Wrapper;