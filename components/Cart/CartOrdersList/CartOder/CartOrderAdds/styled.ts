import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px 0;
  font-size: inherit;

  & > p {
    position: relative;
    width: 100%;
    font-size: inherit;

    & > span {
      font-weight: bold;
      font-size:inherit;
      color: ${PURPLE};
      position: absolute;
      right: 0;
    }
  }
`;

export default Wrapper;
