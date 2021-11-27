import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & > h3 {
    color: ${PURPLE};
  }

  & > div {
    display: flex;
    align-items: center;
    & > input {
      background-color: white;
      text-align: center;
      border-radius: 5px;
      border: 1px ${PINK} solid;
      outline: none;
      width: 5rem;
      padding: 2px;
      color: inherit;
    }

    & > span {
      color: ${PURPLE};
      font-weight: bold;
      padding-right: 5px;
    }

    & > p {
        padding: 0 0.5rem;
    }
  }
`;

export default Wrapper;