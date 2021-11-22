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
      height: 1rem;
      width: 1rem;
      background-color: white;
      border-radius: 3px;
      outline: 1px ${PINK} solid;
      outline-offset: 2px;
    }

    & > span:after {
      content: "";
      position: absolute;
      display: none;
    }

    & input:checked ~ span:after {
      display: block;
    }

    & > span:after {
      left: 4px;
      width: 5px;
      height: 10px;
      border: solid ${PINK};
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
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
