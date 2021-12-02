import styled from "styled-components";

import { PURPLE } from "@utils/colors";

const ListItem = styled.li`
  & > label {
    & > p {
      position: absolute;
      right: 0;
      color: ${PURPLE};
      font-weight: bold;
    }
  }
`;

export default ListItem;
