import styled from "styled-components";
import { PURPLE} from "@utils/colors";

const CustomForm = styled.form`
  /* padding: 0 40px; */
  /* box-sizing: border-box ; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 0.5rem; */
  width: 80vw;
  max-width: 100%;

  & > div {
    position: relative;
    border-bottom: 1px solid #adadad;
    margin: 20px 0;

    & > input {
      width: 100%;
      /* padding: 0 5px; */
      height: 40px;
      font-size: 16px;
      border: none;
      background: none;
      outline: none;
    }

    & span::before {
      content: '';
      position: absolute;
      top: 40px;
      left: 0;
      width: 0%;
      height: 1px;
      background: ${PURPLE};
    }

    & > label {
      position: absolute;
      top: 50%;
      left: 0px;
      color: #adadad;
      transform: translateY(-50%);
      font-size: 16px;
      pointer-events: none;
      transition: .2s;
    }

    & > input:focus ~ label, & > input:valid ~ label{
      top: -5px;
      color: ${PURPLE};
    }

    & > input:focus ~ span::before, & > input:valid ~ span::before {
      width: 100%;
    }

  }

  & > button {
    align-self: center;
  }
`;

export default CustomForm;