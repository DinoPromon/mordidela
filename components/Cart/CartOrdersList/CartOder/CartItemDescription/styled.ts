import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  position: relative;

  & > span {
    color: ${PINK};
    font-weight: bold;
    padding-right: 5px;
  }

  & > h2 {
    font-weight: normal;
  }

  & > div {
    display: flex;
    position: absolute;
    right: 0;
    gap: 0.5rem;
    align-items: center;

    & > span {
      cursor: pointer;
    }

    & > p {
      color: ${PURPLE};
      font-weight: bold;
    }
  }
`;

export default Wrapper;
