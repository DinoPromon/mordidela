import styled from "styled-components";
import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;

  & > div {
    position: absolute;
    background-color: white;
    width: 90%;
    max-width: 600px;
    margin: auto;
    border-radius: 0.5rem;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    left: 0;

    & > span {
      font-size: 2rem;
      color: ${PINK};
      position: absolute;
      right: 12px;
      top: 5px;
      cursor: pointer;
    }
  }
`;

export default Wrapper;
