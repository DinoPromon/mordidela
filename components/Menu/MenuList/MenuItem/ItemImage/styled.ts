import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  height: 25vh;
  cursor: pointer;
  
  & > img {
    max-width: 90%;
    max-height: 90%;
  }
`;

export default Wrapper;
