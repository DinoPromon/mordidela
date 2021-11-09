import styled from "styled-components";

import { PURPLE } from "@utils/colors";

const CustomFooter = styled.footer`
  background: ${PURPLE};
  margin-top: auto;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 180px;

  & > h3 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 3rem;
  }

  & > img {
    max-height: 85px;
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export default CustomFooter;
