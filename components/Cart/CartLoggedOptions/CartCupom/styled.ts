import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0;
  gap: 0.5rem;

  & > input {
    background-color: white;
    text-align: center;
    border-radius: 5px;
    border: 1px ${PURPLE} solid;
    outline: none;
    width: 350px;
  }

  & > button {
    padding: 0.25rem 0.5rem;
  }
`;

export default Wrapper;
