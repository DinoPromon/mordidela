import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 1rem 2px;
  flex-direction: row;
  align-items: center;
  & > p {
    margin-right: auto;
    color: blue;
  }
`;

export default Wrapper;
