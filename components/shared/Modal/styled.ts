import styled from "styled-components";
import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);

  & > div {
    background-color: white;
    margin: auto;
    padding: 20px;
    /* width: 80%; */
    border-radius: 0.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    & > span {
      font-size: 2rem;
      color: ${PINK};
      position: absolute;
      right: 5px;
      top: 0;
      cursor: pointer;
    }
  }
`;

export default Wrapper;
