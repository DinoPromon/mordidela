import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;

  & > h3 {
    color: ${PURPLE};
  }

  & > label {
    display: flex;
    position: relative;
    cursor: pointer;
    padding-left: 18px;
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
      height: 10px;
      width: 10px;
      background-color: white;
      border-radius: 50%;
      outline: 1px ${PINK} solid;
      outline-offset: 3px;
    }

    & > input:checked ~ span {
      background-color: ${PINK};
    }
  }
`;

export default Wrapper;
