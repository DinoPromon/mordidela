import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px 0;
  margin-left: 1.5rem;

  & > p {
    position: relative;
    width: 100%;
    font-size: 13px;

    & > span {
      font-size: 13px;
      font-weight: bold;
      color: ${PURPLE};
      position: absolute;
      right: 0;
    }
  }
`;

export default Wrapper;
