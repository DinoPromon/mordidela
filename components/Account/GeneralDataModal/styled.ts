import styled from "styled-components";
import { PINK} from "@utils/colors";

const Wrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  /* padding-top: 200px; */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; 
  overflow: auto;
  /* background-color: rgb(0, 0, 0);*/
  background-color: rgba(0, 0, 0, 0.3);

  & > div {
    /* position: relative; */
    background-color: white;
    margin: auto;
    padding: 20px;
    width: 80%;
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

    & > form {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

  }
`;

export default Wrapper;
