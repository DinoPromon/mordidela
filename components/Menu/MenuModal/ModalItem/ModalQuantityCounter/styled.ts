import { PURPLE } from "@utils/colors";
import { PINK } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100px;
  padding: 5px;

  & > span {
    font-weight: bold;
    color: #3b3b3b;
  }

  & > button {
    border: none;
    background-color: transparent;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default Wrapper;
