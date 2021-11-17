import styled from "styled-components";

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  text-align: center;

  & > li {
    padding: 0.5rem 0;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    color: white;
    & > a {
      color: inherit;
      font-size: inherit;
      text-decoration: none;
    }
  }
`;

export default Wrapper;