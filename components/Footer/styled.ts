import styled from "styled-components";

const CustomFooter = styled.footer`
  background: rgba(130, 53, 206, 1);
  margin-top: auto;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding-top: 0.5rem;

  & > h3 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 3rem;
  }

  & > img {
    max-height: 85px;
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export default CustomFooter;
