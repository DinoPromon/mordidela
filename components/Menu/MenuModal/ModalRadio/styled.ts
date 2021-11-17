import { PURPLE } from "@utils/colors";
import { PINK } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`

    & > label {
        display: grid;
        position: relative;
        margin-bottom: 0.75rem;
        cursor: pointer;
        padding-left: 25px;
        color: #3b3b3b;
        text-align: left;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        & > input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }

        & > span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            height: 14px;
            width: 14px;
            background-color: white;
            border-radius: 50%;
            outline: 1px ${PINK} solid;
            outline-offset: 3px;
        }

        & > input:checked ~ span{
            background-color: ${PINK};
        }

        & > p {
            position: absolute;
            right: 0;
            color: ${PURPLE};
            font-weight: bold;
        }
    }
`;

export default Wrapper;