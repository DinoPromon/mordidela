import styled from "styled-components";

import { PURPLE } from "@utils/colors";

export const AddOptionContainer = styled.li`
  & > label {
    & > p {
      position: absolute;
      right: 0;
      color: ${PURPLE};
      font-weight: bold;
    }
  }
`;