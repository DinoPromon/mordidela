import styled from "styled-components";

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  font-size: 1rem;
  color: white;
  text-align: center;

  & > li {
    padding: 0.5rem 0;
    font-weight: bold;
    letter-spacing: 1px;
    & > a {
      color: white;
      text-decoration: none;
    }
  }
`;

export default Wrapper;