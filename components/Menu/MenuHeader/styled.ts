import styled from "styled-components";

import { PINK } from "@utils/colors";

const CustomHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  margin: 2.5rem auto;
  width: 85%;
  background-color: ${PINK};
  border-radius: 10px;
  color: white;

  & > h2 {
    width: 90%;
    text-align: center;
    font-size: 2rem;
    letter-spacing: 0.5rem;
  }
`;

export default CustomHeader;
