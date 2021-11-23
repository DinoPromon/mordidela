import styled from "styled-components";
import { PINK, PURPLE } from "@utils/colors";
import CustomLabel from "../../CustomLabel";

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

    & > p {
      position: absolute;
      right: 0;
      color: ${PURPLE};
      font-weight: bold;
    }
  }
`;

export default ListItem;
