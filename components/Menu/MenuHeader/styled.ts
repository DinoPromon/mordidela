import styled from "styled-components";

import { PINK } from "@utils/colors";

const CustomHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 175px;
  width: 100%;
  background-color: ${PINK};
  color: white;

  & > h2 {
    width: 90%;
    text-align: center;
    font-size: 24px;
    letter-spacing: 0.5rem;
  }
`;

export default CustomHeader;
