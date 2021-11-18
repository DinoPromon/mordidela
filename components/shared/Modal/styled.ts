import styled from "styled-components";
import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  & > div {
    position: relative;
    background-color: white;
    width: 90%;
    max-width: 600px;
    margin: auto;
    border-radius: 0.5rem;
    overflow: hidden;

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
