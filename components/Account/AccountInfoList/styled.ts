import styled from "styled-components";

import { PURPLE } from "@utils/colors";

const CustomList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;

  & > li {
    & > button {
      background-color: white;
      color: ${PURPLE};
      font-weight: bold;
      width: 150px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      padding: 1rem;
      margin: auto;
      border: none;
      border-radius: 0.25rem;
      text-align: center;
      cursor: pointer;
      transition: background-color 250ms, color 250ms;

      &:focus {
        background-color: ${PURPLE};
        color: white;
      }
    }
  }
`;

export default CustomList;
