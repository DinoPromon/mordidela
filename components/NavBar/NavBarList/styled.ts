import styled from "styled-components";

const Wrapper = styled.ul`
  display: block;
  list-style: none;
  padding-right: 2rem;
  padding-left: 1rem;
  & > li {
    display: inline-block;
    color: white;
    font-weight: bold;
    margin: 1rem 0.5rem;

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
