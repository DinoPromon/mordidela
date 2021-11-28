import styled from "styled-components";

import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  & > h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    color: ${PURPLE};
  }

  & > div {
    display: flex;
    justify-content: center;
    gap: 1rem;

    & > label {
      display: flex;
      position: relative;
      cursor: pointer;
      padding-left: 25px;
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

      & > input:checked ~ span {
        background-color: ${PINK};
      }

      & > div {
        padding-right: 5px;
      }
    }
  }
`;

export default Wrapper;
