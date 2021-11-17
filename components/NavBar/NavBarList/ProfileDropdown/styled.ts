import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  & > span, & > a {
    text-decoration: none;
    color: inherit;
    padding: 0 0.5rem;
  }
`;

export default Wrapper;