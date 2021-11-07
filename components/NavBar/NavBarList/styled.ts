import styled from "styled-components";

const Wrapper = styled.ul`
  display: block;
  list-style: none;

  & > li {
    display: inline-block;
    color: white;
    margin: 1rem;
    &:nth-of-type(2) {
      float: right;
    }
    &:nth-of-type(3) {
      margin-right: 0.5rem;
      float: right;
    }
  }
`;

export default Wrapper;
