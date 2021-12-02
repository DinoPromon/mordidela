import styled from "styled-components";
import { PINK } from "@utils/colors";

const CustomLabel = styled.label`
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
`;

export default CustomLabel;
