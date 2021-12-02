import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1rem 5fr 2fr;
  column-gap: 0.5rem;

  & > span {
    color: ${PINK};
    font-weight: bold;
    padding-right: 5px;
  }

  & > div {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
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
