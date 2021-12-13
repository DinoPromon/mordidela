import styled from "styled-components";

const CustomFigure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 130px;
  max-height: 130px;
  margin: auto;

  & > figcaption {
    text-align: center;
    margin-top: -7px;
    color: white;
    letter-spacing: 1.5px;
    font-weight: 700;
    font-size: 18px;
  }
`;

export default CustomFigure;
