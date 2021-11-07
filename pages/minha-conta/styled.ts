import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 100px;
    margin-top: 1rem;
  }

  & > h3 {
    line-height: 3rem;
  }

  & > h4 {
    background-color: white;
    width: 150px;
    border: 1.5px solid rgba(130, 53, 206, 1);
    padding: 10px;
    margin: auto;
    border-radius: 0.5rem;
    text-align: center;
    margin-bottom: 15px;
    transition: color 0.4s ease;
  }
`;

export default Wrapper;
