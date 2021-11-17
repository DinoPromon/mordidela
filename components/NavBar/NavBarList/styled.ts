import styled from "styled-components";

const Wrapper = styled.ul`
  display: block;
  list-style: none;

  & > li {
    display: inline-block;
    color: white;
    font-weight: bold;
    margin: 1rem 1.5rem;

    & > a {
      text-decoration: none;
      color: inherit;
    }

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
