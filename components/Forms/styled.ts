import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  & > p {
    font-size: 13px;
    font-weight: bold;
    margin: 0 0.25rem;
  }
`;

export default Wrapper;