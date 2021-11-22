import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  width: 100%;
  height: 25vh;
  cursor: pointer;
  
  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default Wrapper;
