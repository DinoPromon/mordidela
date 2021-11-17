import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1.75rem;
  max-width: 100%;
  
  & > button {
    align-self: center;
  }
`;

export default CustomForm;
