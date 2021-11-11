import styled from "styled-components";

// generalizar esse código

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 2rem;
  justify-content: center;
  gap: 1.5rem;
  max-width: 400px;

  & > img {
    align-self: center;
    width: 150px;
    margin-bottom: 1rem;
  }

  & > p {
    color: red;
  }

  & > div {
    display: flex;
    margin: 1rem 2px;
    flex-direction: row;
    align-items: center;
    & > p {
      margin-right: auto;
      color: blue;
    }
  }
`;

export default Wrapper;
