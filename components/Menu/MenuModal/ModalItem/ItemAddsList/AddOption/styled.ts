import styled from "styled-components";

import CustomLabel from "../../CustomLabel";
import { PINK, PURPLE } from "@utils/colors";

const ListItem = styled.li`
  & > label {
    ${CustomLabel}

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

export default ListItem;
