import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.5rem;
  width: 80vw;
  max-width: 720px;

  & > input {
    max-width: 720px;
  }

  & > button {
    align-self: center;
  }
`;

export default CustomForm;