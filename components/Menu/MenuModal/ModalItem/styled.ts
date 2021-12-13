import { PURPLE } from "@utils/colors";
import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;

  & > img {
    display: block;
    max-height: 180px;
    max-height: 180px;
    margin: 0 auto;
  }

  & > h2 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
    color: ${PURPLE};
  }

  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0.5rem;

    & > h3 {
      color: ${PURPLE};
    }
  }

  & > textarea {
    background-color: white;
    font-family: inherit;
    color: inherit;
    margin: 0.5rem 0;
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.25rem;
    border: 1px ${PURPLE} solid;
    outline: none;
    resize: none;
  }

  & > div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    align-items: center;
  }
`;

export default CustomForm;
