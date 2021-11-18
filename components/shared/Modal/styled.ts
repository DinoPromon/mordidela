import styled from "styled-components";
import { PINK, PURPLE } from "@utils/colors";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: none;

  & > div {
    background-color: white;
    margin: auto;
    padding: 20px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    border-radius: 0.5rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;

    scroll-behavior: smooth;
    scrollbar-color: #C9BFD1 transparent;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #C9BFD1;
      border-radius: 10px;
    }

    


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
