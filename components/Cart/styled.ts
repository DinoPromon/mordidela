import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & > h2 {
    font-size: 18px;
    text-align: center;
    color: ${PURPLE};
  }

  & > p {
    width: 100%;
    text-align: end;
    color: ${PINK};
    font-weight: bold;

    & > span {
      color: ${PURPLE};
    }
  }

  & > p:last-of-type {
    text-align: center;
    font-size: 1.25rem;
    padding: 0.25rem 0;
    & > span {
      font-size: inherit;
    }
  }

  & > div:last-child {
    align-self: center;
    & > p {
      color: red
    }
  }
`;

export default CustomForm;
