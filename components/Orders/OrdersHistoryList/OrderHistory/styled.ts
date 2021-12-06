import styled from "styled-components";
import { PURPLE, PINK } from "@utils/colors";

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > p {
    & > span {
      &:nth-child(odd) {
        color: ${PINK};
      }
      &:nth-child(even) {
        color: ${PURPLE}
      }
    }
  }
`;

export default Item;